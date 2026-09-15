import { DatabaseSync } from 'node:sqlite';
import { createHmac, randomBytes, randomUUID, timingSafeEqual } from 'node:crypto';

const COOKIE = 'portfolio_visitor';

export function createVisitorStore(filename) {
  const db = new DatabaseSync(filename);
  db.exec(`PRAGMA journal_mode=WAL;
    CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS visitors (id TEXT PRIMARY KEY, region TEXT, latitude REAL, longitude REAL, label TEXT);
    CREATE INDEX IF NOT EXISTS visitor_region ON visitors(region);`);
  db.prepare('INSERT OR IGNORE INTO settings VALUES (?, ?)').run('cookie_secret', randomBytes(32).toString('hex'));
  const secret = db.prepare('SELECT value FROM settings WHERE key = ?').get('cookie_secret').value;
  const sign = id => createHmac('sha256', secret).update(id).digest('hex');
  const insert = db.prepare('INSERT OR IGNORE INTO visitors (id) VALUES (?)');
  const locate = db.prepare('UPDATE visitors SET region = ?, latitude = ?, longitude = ?, label = ? WHERE id = ? AND region IS NULL');
  function summary() {
    const totals = db.prepare('SELECT COUNT(*) AS totalVisitors, COUNT(region) AS locatedVisitors FROM visitors').get();
    const regions = db.prepare('SELECT region AS id, label, latitude, longitude, COUNT(*) AS visitors FROM visitors WHERE region IS NOT NULL GROUP BY region ORDER BY visitors DESC, region').all();
    return { ...totals, regions };
  }
  function register(cookie, location) {
    const match = /(?:^|;\s*)portfolio_visitor=([a-f0-9-]{36})\.([a-f0-9]{64})(?:;|$)/.exec(cookie ?? '');
    const valid = match && timingSafeEqual(Buffer.from(match[2], 'hex'), Buffer.from(sign(match[1]), 'hex'));
    const id = valid ? match[1] : randomUUID();
    // SQLite serializes this transaction, including simultaneous repeat visits.
    db.exec('BEGIN IMMEDIATE');
    try {
      insert.run(id);
      if (location) {
        const lat = Math.round(location.latitude / 5) * 5;
        let lon = Math.round(location.longitude / 5) * 5;
        if (lon === 180) lon = -180;
        const region = `${location.countryCode}:${lat}:${lon}`;
        locate.run(region, lat, lon, location.country, id);
      }
      db.exec('COMMIT');
    } catch (error) { db.exec('ROLLBACK'); throw error; }
    return { cookie: `${COOKIE}=${id}.${sign(id)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=31536000`, data: summary() };
  }
  return { register, summary, close: () => db.close() };
}

export function parseLocation(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('Invalid body');
  if (body.location === undefined || body.location === null) return null;
  const p = body.location;
  if (typeof p !== 'object' || !Number.isFinite(p.latitude) || Math.abs(p.latitude) > 90 || !Number.isFinite(p.longitude) || Math.abs(p.longitude) > 180 || typeof p.countryCode !== 'string' || !/^[A-Z]{2}$/.test(p.countryCode) || typeof p.country !== 'string' || p.country.trim().length < 1 || p.country.length > 80 || /[\u0000-\u001f<>]/.test(p.country)) throw new Error('Invalid location');
  return { ...p, country: p.country.trim() };
}
