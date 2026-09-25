import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';

// Run after: docker build -t portfolio-storage-fix:local .
const image = process.env.STORAGE_TEST_IMAGE || 'portfolio-storage-fix:local';
const docker = (...args) => execFileSync('docker', args, { encoding: 'utf8', timeout: 30000, stdio: ['ignore', 'pipe', 'pipe'] }).trim();

test('restricted containers preserve SQLite without changing storage ownership', { timeout: 120000 }, () => {
  const name = `portfolio-storage-test-${randomUUID()}`;
  const mount = `type=volume,source=${name},target=/data`;
  const restricted = ['--read-only', '--cap-drop=ALL', '--security-opt=no-new-privileges'];
  docker('volume', 'create', name);
  try {
    const cookie = docker('run', '--rm', '--mount', mount, '--user', '0:0', '--entrypoint', 'node', image, '--input-type=module', '-e', `
      import { createVisitorStore } from './server/visitors.mjs';
      import { chmodSync, chownSync, writeFileSync, mkdirSync } from 'node:fs';
      const store = createVisitorStore('/data/visitors.sqlite');
      console.log(store.register(null, null).cookie.split(';')[0]);
      store.close();
      writeFileSync('/data/unrelated.txt', 'leave this alone', {mode: 0o600});
      chownSync('/data', 2000, 1000);
      chmodSync('/data', 0o770);
      chownSync('/data/visitors.sqlite', 2000, 1000);
      chmodSync('/data/visitors.sqlite', 0o660);
      mkdirSync('/data/custom');
      chownSync('/data/custom', 1234, 1000);
      chmodSync('/data/custom', 0o700);
    `);

    // The previous startup script failed here despite usable group write access.
    const before = spawnSync('docker', ['run', '--rm', ...restricted, '--user', '0:1000', '--mount', mount, '--entrypoint', 'sh', image, '-c', 'chown node:node /data'], { encoding: 'utf8', timeout: 30000 });
    assert.notEqual(before.status, 0);
    assert.match(before.stderr, /Operation not permitted/);

    const result = docker('run', '--rm', ...restricted, '--mount', mount, image, 'node', '--input-type=module', '-e', `
      import assert from 'node:assert/strict';
      import { statSync } from 'node:fs';
      import { createVisitorStore } from './server/visitors.mjs';
      assert.equal(process.getuid(), 1000);
      assert.equal(process.getgid(), 1000);
      assert.equal(statSync('/data/unrelated.txt').uid, 0);
      assert.equal(statSync('/data').uid, 2000);
      assert.equal(statSync('/data/visitors.sqlite').uid, 2000);
      assert.equal(statSync('/data/visitors.sqlite').mode & 0o777, 0o660);
      const store = createVisitorStore('/data/visitors.sqlite');
      assert.equal(store.summary().totalVisitors, 1);
      assert.equal(store.register(${JSON.stringify(cookie)}, null).data.totalVisitors, 1);
      assert.equal(store.register(null, null).data.totalVisitors, 2);
      store.close();
      console.log('preserved');
    `);
    assert.equal(result, 'preserved');

    // Start the real image CMD on the same volume, without exposing a host port.
    docker('run', '-d', ...restricted, '--name', name, '--mount', mount, image);
    const summary = docker('exec', name, 'node', '--input-type=module', '-e', `
      import assert from 'node:assert/strict';
      import { readFileSync } from 'node:fs';
      assert.match(readFileSync('/proc/1/status', 'utf8'), /Uid:\\s+1000\\s+1000/);
      let response;
      for (let attempt = 0; attempt < 25; attempt++) {
        try { response = await fetch('http://127.0.0.1:5173/api/visitors'); break; }
        catch { await new Promise(resolve => setTimeout(resolve, 100)); }
      }
      assert.equal(response?.status, 200);
      console.log(JSON.stringify(await response.json()));
    `);
    assert.equal(JSON.parse(summary).totalVisitors, 2);
    docker('stop', '-t', '3', name);

    const custom = docker('run', '--rm', ...restricted, '--user', '1234:1000', '--mount', mount, '-e', 'VISITOR_DB_PATH=/data/custom/visitors.sqlite', image, 'node', '--input-type=module', '-e', `
      import assert from 'node:assert/strict';
      import { createVisitorStore } from './server/visitors.mjs';
      assert.equal(process.getuid(), 1234);
      const store = createVisitorStore(process.env.VISITOR_DB_PATH);
      assert.equal(store.register(null, null).data.totalVisitors, 1);
      store.close();
      console.log('custom user');
    `);
    assert.equal(custom, 'custom user');

    const readOnly = spawnSync('docker', ['run', '--rm', ...restricted, '--mount', `${mount},readonly`, image, 'node', '-e', 'process.exit(0)'], { encoding: 'utf8', timeout: 30000 });
    assert.notEqual(readOnly.status, 0);
    assert.match(readOnly.stderr, /Visitor storage unavailable/);
  } finally {
    spawnSync('docker', ['rm', '-f', name], { stdio: 'ignore', timeout: 15000 });
    docker('volume', 'rm', name);
  }
});
