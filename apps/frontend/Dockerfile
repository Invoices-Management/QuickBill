FROM node:20-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm

# Copy monorepo-level configs
COPY pnpm-workspace.yaml ./
COPY pnpm-lock.yaml ./
COPY package.json ./

# Copy frontend package manifest
COPY apps/frontend/package.json ./apps/frontend/

# Install only frontend deps
RUN pnpm install --filter ./apps/frontend...

# Copy frontend source code
COPY apps/frontend ./apps/frontend

# Build the frontend app
RUN pnpm --filter ./apps/frontend... build

# -------- Production Stage --------
FROM node:20-alpine AS runner

WORKDIR /app
RUN npm install -g pnpm

COPY --from=builder /app/apps/frontend/.next ./.next
COPY --from=builder /app/apps/frontend/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/frontend/package.json .

ENV NODE_ENV=production
EXPOSE 3000

CMD ["pnpm", "start"]
