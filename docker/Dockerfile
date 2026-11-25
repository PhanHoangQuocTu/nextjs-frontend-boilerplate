# syntax=docker/dockerfile:1
ARG NODE_VERSION=26.13.1

FROM node:${NODE_VERSION}-alpine AS toolchain
WORKDIR /app
COPY package.json ./
RUN npm install --global --ignore-scripts --no-audit --no-fund --no-update-notifier "$(node -p "require('./package.json').packageManager")"

# ---- deps: install with a cached pnpm store ---------------------------------
FROM toolchain AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
    HUSKY=0 pnpm install --frozen-lockfile --store-dir=/pnpm/store

# ---- builder ----------------------------------------------------------------
FROM toolchain AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* values are inlined at build time, so they must be build args.
ARG NEXT_PUBLIC_APP_ENV=production
ARG NEXT_PUBLIC_APP_URL=http://localhost:3000
# Replace or remove the JSONPlaceholder default when removing the posts demo.
ARG NEXT_PUBLIC_API_URL=https://jsonplaceholder.typicode.com
ENV NEXT_PUBLIC_APP_ENV=$NEXT_PUBLIC_APP_ENV \
    NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL \
    NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL \
    NEXT_TELEMETRY_DISABLED=1

RUN pnpm build

# ---- runner -----------------------------------------------------------------
FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

# Standalone output already contains the traced node_modules and server.js.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/api/health || exit 1

CMD ["node", "server.js"]
