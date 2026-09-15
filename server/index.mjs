import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { mkdir, stat } from 'node:fs/promises';
import { dirname, extname, resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createVisitorStore, parseLocation } from './visitors.mjs';

const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.pdf': 'application/pdf', '.mp4': 'video/mp4', '.woff2': 'font/woff2' };
export async function createPortfolioServer({ databasePath, publicOrigin, staticDir = resolve('dist') }) {
  await mkdir(dirname(databasePath), { recursive: true });
  const store = createVisitorStore(databasePath);
  const limits = new Map();
  const root = resolve(staticDir);
  function json(res, status, data, headers = {}) {
    res.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...headers });
    res.end(JSON.stringify(data));
  }
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://localhost');
      if (url.pathname === '/api/visitors') {
        if (req.method === 'GET') return json(res, 200, store.summary());
        if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' }, { Allow: 'GET, POST' });
        const expectedOrigin = publicOrigin || `http://${req.headers.host}`;
        if (req.headers['sec-fetch-site'] === 'cross-site' || (req.headers.origin && req.headers.origin !== expectedOrigin)) return json(res, 403, { error: 'Origin not allowed' });
        if (!req.headers['content-type']?.startsWith('application/json')) return json(res, 415, { error: 'JSON required' });
        // Socket addresses live only in this short-lived rate limit, never in SQLite.
        // No forwarded header is trusted: this also caps total traffic behind a proxy.
        const key = req.socket.remoteAddress || 'unknown';
        const now = Date.now();
        for (const [id, bucket] of limits) if (bucket.until < now) limits.delete(id);
        const bucket = limits.get(key) || { count: 0, until: now + 60000 };
        bucket.count++; limits.set(key, bucket);
        if (bucket.count > 120) return json(res, 429, { error: 'Try again shortly' }, { 'Retry-After': '60' });
        let body = '';
        for await (const chunk of req) {
          body += chunk;
          if (Buffer.byteLength(body) > 2048) { json(res, 413, { error: 'Request too large' }); req.resume(); return; }
        }
        let location;
        try { location = parseLocation(JSON.parse(body)); }
        catch { return json(res, 400, { error: 'Invalid visitor location' }); }
        const result = store.register(req.headers.cookie, location);
        return json(res, 200, result.data, { 'Set-Cookie': result.cookie + (expectedOrigin.startsWith('https:') ? '; Secure' : '') });
      }
      if (url.pathname.startsWith('/api/')) return json(res, 404, { error: 'Not found' });
      if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405); res.end(); return; }
      let pathname;
      try { pathname = decodeURIComponent(url.pathname); } catch { res.writeHead(400); res.end(); return; }
      let file = resolve(root, `.${pathname}`);
      if (file !== root && !file.startsWith(root + sep)) { res.writeHead(403); res.end(); return; }
      let info = await stat(file).catch(() => null);
      if (!info?.isFile()) {
        if (extname(pathname)) { res.writeHead(404); res.end(); return; }
        file = resolve(root, 'index.html'); info = await stat(file).catch(() => null);
      }
      if (!info?.isFile()) { res.writeHead(404); res.end('Run npm run build to serve the portfolio.'); return; }
      res.writeHead(200, { 'Content-Type': mime[extname(file)] || 'application/octet-stream', 'Content-Length': info.size, 'Cache-Control': file.includes(`${sep}assets${sep}`) ? 'public, max-age=31536000, immutable' : 'no-cache', 'X-Content-Type-Options': 'nosniff' });
      if (req.method === 'HEAD') { res.end(); return; }
      createReadStream(file).on('error', () => res.destroy()).pipe(res);
    } catch { if (!res.headersSent) json(res, 500, { error: 'Visitor service unavailable' }); else res.destroy(); }
  });
  server.requestTimeout = 10000;
  server.on('close', () => store.close());
  return server;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const port = Number(process.env.PORT || 5173);
  const server = await createPortfolioServer({ databasePath: resolve(process.env.VISITOR_DB_PATH || 'data/visitors.sqlite'), publicOrigin: process.env.PUBLIC_ORIGIN });
  server.listen(port, '0.0.0.0', () => console.log(`Portfolio and visitor API listening on ${port}`));
  for (const signal of ['SIGTERM', 'SIGINT']) process.on(signal, () => server.close());
}
