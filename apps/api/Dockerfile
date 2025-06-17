FROM node:22-alpine AS builder

RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN npm install -g pnpm@10.12.1

# Копіюємо файли для залежностей
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY package.json ./
COPY apps/api/package.json ./apps/api/
COPY packages/shared-lib/package.json ./packages/shared-lib/

# Встановлюємо залежності
RUN pnpm install --frozen-lockfile

# Копіюємо весь проект і будуємо
COPY . .
RUN pnpm run build

# Генеруємо prisma клієнт
WORKDIR /app/apps/api
RUN pnpm prisma generate

# Фінальний образ
FROM node:22-alpine AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 apiuser
RUN chown -R apiuser:nodejs /pages

COPY --from=builder --chown=apiuser:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=apiuser:nodejs /app/package.json ./package.json
COPY --from=builder --chown=apiuser:nodejs /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=builder --chown=apiuser:nodejs /app/apps/api/dist ./apps/api/dist
COPY --from=builder --chown=apiuser:nodejs /app/apps/api/package.json ./apps/api/package.json
COPY --from=builder --chown=apiuser:nodejs /app/packages/shared-lib ./packages/shared-lib

USER apiuser

ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000

CMD ["node", "apps/api/dist/index.js"]
