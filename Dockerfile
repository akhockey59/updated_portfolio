FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Build the app (this happens at build time, not runtime)
RUN npm run build

FROM node:24-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY server ./server
RUN mkdir -p /data && chown node:node /data && chmod 755 /app/server/docker-entrypoint.sh
ENV PORT=5173
ENV VISITOR_DB_PATH=/data/visitors.sqlite
VOLUME ["/data"]
USER node

# Validate storage as the app user; managed hosts may forbid chown/setuid.
ENTRYPOINT ["/app/server/docker-entrypoint.sh"]

EXPOSE 5173

CMD ["node", "server/index.mjs"]
