FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy monorepo-level package configs
COPY pnpm-workspace.yaml ./
COPY pnpm-lock.yaml ./
COPY package.json ./

# Copy backend package manifest
COPY apps/backend/package.json ./apps/backend/

# Install only backend deps
RUN pnpm install --filter ./apps/backend...

# Copy backend source code
COPY apps/backend ./apps/backend

# Build the backend app
RUN pnpm --filter ./apps/backend... build

# -------- Production Stage --------
FROM node:20-alpine AS runner

WORKDIR /app
RUN npm install -g pnpm

COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/backend/package.json .

ENV NODE_ENV=production
EXPOSE 5000

CMD ["node", "dist/main"]
