FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Build the app (this happens at build time, not runtime)
RUN npm run build

FROM node:24-alpine
WORKDIR /app
RUN apk add --no-cache su-exec
COPY --from=build /app/dist ./dist
COPY server ./server
RUN mkdir -p /app/data && chown node:node /app/data && chmod 755 /app/server/docker-entrypoint.sh
ENV PORT=5173
ENV VISITOR_DB_PATH=/app/data/visitors.sqlite
VOLUME ["/app/data"]

# Prepare mounted storage as root, then drop privileges before starting Node.
ENTRYPOINT ["/app/server/docker-entrypoint.sh"]

EXPOSE 5173

CMD ["node", "server/index.mjs"]
