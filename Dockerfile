# Multi-stage Dockerfile for the CTAI portal.
# Builds a Next.js app with native better-sqlite3 against Node 20 Alpine.

############### build stage ###############
FROM node:20-alpine AS builder

# build deps for better-sqlite3 (native module)
RUN apk add --no-cache python3 make g++ libc6-compat

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Drop the bulky source PDFs from data/ — only data/curriculum.js is
# needed at runtime. portal.db / store.json / logos are gitignored
# and would not be present anyway, but be defensive.
RUN find /app/data -maxdepth 1 -type f -name '*.pdf' -delete \
 && rm -f /app/data/store.json /app/data/store.json.migrated \
          /app/data/portal.db /app/data/portal.db-* \
 && rm -rf /app/data/logos

############### runtime stage ###############
FROM node:20-alpine AS runner

# better-sqlite3 needs libstdc++ at runtime
RUN apk add --no-cache libc6-compat \
 && addgroup -S app && adduser -S app -G app

WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=builder --chown=app:app /app ./

# data/ is the writable folder for SQLite + uploaded logos.
# Mount this as a Docker volume so it survives container rebuilds.
VOLUME ["/app/data"]

USER app
EXPOSE 3000
CMD ["npm", "run", "start"]
