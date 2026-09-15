# Shared visitor globe

The Node 24 service serves the portfolio and `/api/visitors` on port 5173. SQLite stores anonymous browser IDs and coarse regional totals. The same data is returned to every visitor. Counts begin when this service is deployed; previous visits cannot be recovered from the static site.

## Run locally

Use Node 24. Run `npm start` alongside `npm run dev`. Vite forwards `/api` to port 5173. The ignored `data/visitors.sqlite` file persists across local server restarts. Run `npm run build && npm start` to serve the production build directly.

The Vite proxy preserves the original Host header so browser registration passes the API's same-origin check. If the globe says unavailable, inspect `/api/visitors`: a 403 means the origin configuration does not match, a connection failure means the Node service is stopped, and an HTML response means the deployment still uses a static-only server.

## GitHub and the database file

Commit the server code and schema initialization, not the live database. `.gitignore` and `.dockerignore` exclude `data/` and SQLite database/journal files. The service creates the file on first start and reuses it afterward. Local and hosted environments keep separate visitor histories, so a Git push cannot merge, replace, or conflict with live visitor records. Persistence across container replacement still requires the named volume below; GitHub is not the database backup.

## Deplexo deployment

Deploy using the repository Dockerfile, expose port **5173**, and configure:

```text
PUBLIC_ORIGIN=https://amber-orbit-2566.de.uday.me
VISITOR_DB_PATH=/app/data/visitors.sqlite
```

Mount a **persistent named volume/disk at `/app/data`**, writable by container user `node` (UID 1000). Reattach the same volume on every redeploy. The Dockerfile's `VOLUME` declaration alone does not guarantee that the host will reuse its contents. Use one app instance with this SQLite database. Multiple replicas or hosts require a shared database instead. Do not cache `/api/visitors` at the CDN; the service sends `Cache-Control: no-store`.

Back up SQLite using its online backup mechanism, or stop the service and back up the entire data directory including WAL files. The signing secret is stored in the same database and must persist with it.

## Counting and location

- One signed, HttpOnly, same-site cookie identifies a browser for up to a year. Refreshes/revisits do not add another visitor. Different devices, cleared cookies, and private browsing can count separately; this is an approximate browser count, not a verified count of people.
- A browser requests approximate IP geolocation from `ipwho.is`, rounds coordinates to a five-degree grid, and sends only rounded coordinates and country to this app. Precise browser geolocation is never requested. The external provider sees the request IP under its own policies. No IP address is stored in SQLite.
- Visits still count when geolocation is blocked. They are included in the total but have no map marker. Map markers group browsers in the same country/grid region; the list shows their counts.
- Anonymous counts are not security-grade analytics. Public clients can fabricate their location or clear cookies. The API rejects cross-origin registration, validates payloads, and limits POSTs to 120 per minute per direct peer. Behind the hosting proxy that limit is shared; forwarded headers are deliberately not trusted.
- GET returns aggregate totals only. POST registers/deduplicates a browser, assigns a signed cookie, and returns the same summary. The frontend refreshes once a minute while visible and retains the last valid summary on temporary failures.

## Validation

Run `npm run test:visitors`, `npm run build`, and `npx tsc -p tsconfig.app.json --noEmit`.
