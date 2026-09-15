import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm, writeFile, mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createPortfolioServer } from './index.mjs';
import { createServer as createViteServer, loadConfigFromFile } from 'vite';

test('shared anonymous counts survive restarts and reject invalid registrations', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'portfolio-visitors-'));
  const databasePath = join(directory, 'visitors.sqlite');
  const publicOrigin = 'https://portfolio.example';
  await mkdir(join(directory, 'public'));
  await writeFile(join(directory, 'public', 'index.html'), '<h1>Portfolio</h1>');
  let server;
  let base;
  async function start() {
    server = await createPortfolioServer({databasePath, publicOrigin, staticDir: join(directory, 'public')});
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    base = `http://127.0.0.1:${server.address().port}`;
  }
  async function stop() { await new Promise(resolve => server.close(resolve)); }
  async function visit(location = null, cookie, origin = publicOrigin) {
    return fetch(`${base}/api/visitors`, {method: 'POST', headers: {'Content-Type': 'application/json', Origin: origin, ...(cookie ? {Cookie: cookie} : {})}, body: JSON.stringify({location})});
  }
  const india = {latitude: 23.03, longitude: 72.58, countryCode: 'IN', country: 'India'};
  const kenya = {latitude: -1.3, longitude: 36.8, countryCode: 'KE', country: 'Kenya'};
  try {
    await start();
    assert.deepEqual(await (await fetch(`${base}/api/visitors`)).json(), {totalVisitors: 0, locatedVisitors: 0, regions: []});
    const first = await visit(india);
    const cookie = first.headers.get('set-cookie').split(';')[0];
    assert.match(first.headers.get('set-cookie'), /HttpOnly; SameSite=Lax/);
    assert.match(first.headers.get('set-cookie'), /Secure/);
    const initial = await first.json();
    assert.equal(initial.totalVisitors, 1); assert.equal(initial.regions[0].latitude, 25); assert.equal(initial.regions[0].longitude, 75);
    await Promise.all(Array.from({length: 8}, () => visit(india, cookie)));
    assert.equal((await (await visit(kenya, cookie)).json()).totalVisitors, 1);
    await visit(india); await visit(kenya);
    const missing = await visit(); const missingCookie = missing.headers.get('set-cookie').split(';')[0];
    let map = await (await fetch(`${base}/api/visitors`)).json();
    assert.equal(map.totalVisitors, 4); assert.equal(map.locatedVisitors, 3); assert.equal(map.regions.length, 2); assert.equal(map.regions[0].visitors, 2);
    assert(!JSON.stringify(map).includes(cookie));
    assert.equal((await visit({...india, latitude: 900})).status, 400);
    assert.equal((await visit(india, undefined, 'https://unrelated.example')).status, 403);
    assert.equal((await fetch(`${base}/api/visitors`, {method:'DELETE'})).status, 405);
    assert.equal((await fetch(`${base}/api/missing`)).status, 404);
    assert.equal((await fetch(`${base}/data/visitors.sqlite`)).status, 404);
    assert.match(await (await fetch(`${base}/`)).text(), /Portfolio/);
    await visit(kenya, missingCookie);
    map = await (await fetch(`${base}/api/visitors`)).json(); assert.equal(map.totalVisitors,4); assert.equal(map.locatedVisitors,4);
    await stop(); await start();
    const repeat = await visit(india, cookie); assert.equal((await repeat.json()).totalVisitors, 4);
    const tampered = cookie.slice(0, -1) + (cookie.endsWith('a') ? 'b' : 'a');
    assert.equal((await (await visit(india, tampered)).json()).totalVisitors, 5);
    let response;
    for (let i = 0; i < 121; i++) response = await visit(india, cookie);
    assert.equal(response.status, 429);
    assert.equal((await (await fetch(`${base}/api/visitors`)).json()).totalVisitors, 5);
  } finally { if (server?.listening) await stop(); await rm(directory, {recursive:true, force:true}); }
});

test('Vite preview accepts same-origin browser registration and rejects another origin', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'portfolio-proxy-'));
  const api = await createPortfolioServer({databasePath: join(directory, 'visitors.sqlite')});
  let vite;
  try {
    await new Promise(resolve => api.listen(0, '127.0.0.1', resolve));
    const loaded = await loadConfigFromFile({command: 'serve', mode: 'test'});
    vite = await createViteServer({ ...loaded.config, configFile: false, cacheDir: join(directory, 'vite-cache'), logLevel: 'silent', server: {
      ...loaded.config.server, host: '127.0.0.1', port: 0,
      proxy: {'/api': {...loaded.config.server.proxy['/api'], target: `http://127.0.0.1:${api.address().port}`}},
    }});
    await vite.listen();
    const origin = `http://127.0.0.1:${vite.httpServer.address().port}`;
    const register = (source, cookie) => fetch(`${origin}/api/visitors`, {
      method: 'POST', headers: {'Content-Type':'application/json', Origin:source, ...(cookie ? {Cookie:cookie} : {})}, body: '{"location":null}',
    });
    const first = await register(origin);
    assert.equal(first.status, 200);
    const cookie = first.headers.get('set-cookie').split(';')[0];
    assert.equal((await first.json()).totalVisitors, 1);
    assert.equal((await (await register(origin,cookie)).json()).totalVisitors, 1);
    assert.equal((await register('https://unrelated.example')).status, 403);
  } finally {
    await vite?.close();
    if (api.listening) await new Promise(resolve => api.close(resolve));
    await rm(directory, {recursive:true,force:true});
  }
});
