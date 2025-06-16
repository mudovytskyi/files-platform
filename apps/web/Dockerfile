FROM node:22-alpine AS builder

RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN npm install -g pnpm@10.12.1

# Копіюємо файли для залежностей
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY package.json ./
COPY apps/web/package.json ./apps/web/
COPY packages/shared-lib/package.json ./packages/shared-lib/
COPY packages/ui-components/package.json ./packages/ui-components/

# Встановлюємо залежності
RUN pnpm install --frozen-lockfile

# Копіюємо весь проект і будуємо
COPY . .
RUN pnpm run build

# Фінальний образ
FROM node:22-alpine AS runner

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 webuser
RUN chown -R webuser:nodejs /app

COPY --from=builder --chown=webuser:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=webuser:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=webuser:nodejs /app/apps/web/public ./apps/web/public

USER webuser

ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000

CMD ["node", "apps/web/server.js"]
