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
PUBLIC_ORIGIN=https://aakashmaurya.de.deplexo.com
VISITOR_DB_PATH=/data/visitors.sqlite
```

Mount a **persistent named volume/disk at `/data`**, writable by the application user (default `node`, UID/GID 1000:1000). Reattach the same volume on every redeploy. The Dockerfile's `VOLUME` declaration alone does not guarantee that the host will reuse its contents. Use one app instance with this SQLite database. Multiple replicas or hosts require a shared database instead. Do not cache `/api/visitors` at the CDN; the service sends `Cache-Control: no-store`.

Use the exact site origin in `PUBLIC_ORIGIN`, without a trailing slash, and redeploy after changing it.

### SQLite startup permissions

If the build succeeds but startup reports `SQLITE_CANTOPEN` / `unable to open database file`, check the runtime storage mount and its permissions. A mounted volume replaces `/data` from the image, so the Dockerfile's build-time `chown` is not sufficient.

The container starts as `node` by default and uses Deplexo’s supported `/data` mount. The entrypoint checks existing SQLite files and creates/removes a uniquely named temporary write probe in the database directory. It does **not** run `chown`, `chmod`, `su-exec`, or switch users at runtime. Group permissions or ACLs are sufficient; the directory does not need to be owned by the app user. A user override supplied by the hosting platform is respected.

The previous entrypoint required root to change ownership and then switch to `node`. Managed hosts can prohibit those operations even on writable storage, resulting in `chown: /data: Operation not permitted`. This requirement has been removed. The image still sets ownership of its default directory at build time for ordinary Docker volumes.

Keep `VISITOR_DB_PATH=/data/visitors.sqlite` in Deplexo’s environment settings; an explicit old `/app/data` setting overrides the new image default. Reattach the existing persistent volume. If existing data lives elsewhere, migrate it while the app is stopped, including SQLite journal files, rather than starting a new history by mistake.

If startup still reports a failed write probe or unreadable database, the platform must grant the running UID/GID write access to the mount and existing database files. Read-only mounts still cannot support SQLite. Do not move the database into `/tmp` or switch to memory storage: neither preserves counts on redeployment.

After deploying, runtime logs should show `Portfolio and visitor API listening on 5173`, and `GET /api/visitors` should return JSON. A remaining 403 during registration points to `PUBLIC_ORIGIN`, not SQLite permissions.

Back up SQLite using its online backup mechanism, or stop the service and back up the entire data directory including WAL files. The signing secret is stored in the same database and must persist with it.

## Counting and location

- One signed, HttpOnly, same-site cookie identifies a browser for up to a year. Refreshes/revisits do not add another visitor. Different devices, cleared cookies, and private browsing can count separately; this is an approximate browser count, not a verified count of people.
- A browser requests approximate IP geolocation from `ipwho.is`, rounds coordinates to a five-degree grid, and sends only rounded coordinates and country to this app. Precise browser geolocation is never requested. The external provider sees the request IP under its own policies. No IP address is stored in SQLite.
- Visits still count when geolocation is blocked. They are included in the total but have no map marker. Map markers group browsers in the same country/grid region; the list shows their counts.
- Anonymous counts are not security-grade analytics. Public clients can fabricate their location or clear cookies. The API rejects cross-origin registration, validates payloads, and limits POSTs to 120 per minute per direct peer. Behind the hosting proxy that limit is shared; forwarded headers are deliberately not trusted.
- GET returns aggregate totals only. POST registers/deduplicates a browser, assigns a signed cookie, and returns the same summary. The frontend refreshes once a minute while visible and retains the last valid summary on temporary failures.

## Validation

Run `npm run test:visitors`, `npm run build`, and `npx tsc -p tsconfig.app.json --noEmit`.

For runtime volume permissions, build `docker build -t portfolio-storage-fix:local .`, then run `node --test server/docker-storage.test.mjs`. This uses an isolated temporary Docker volume to reproduce forbidden ownership changes, verify startup with all Linux capabilities dropped and a read-only root filesystem, preserve counts/cookies and existing ownership across container replacement, honor a custom runtime user/database path, and reject a read-only data mount. It removes only its own test container and volume afterward.
