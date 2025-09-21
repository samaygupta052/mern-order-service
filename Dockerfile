# =====================
# Stage 1: Build
# =====================
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Optional build step if using TypeScript
# RUN npm run build

# =====================
# Stage 2: Production image
# =====================
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app ./

ENV NODE_ENV=production

EXPOSE 7001

CMD ["node", "src/server.js"]

# Optional health check
# HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
# CMD curl -f http://localhost:7001/health || exit 1
