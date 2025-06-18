# Файлова платформа

Платформа для зберігання та керування файлами з використанням MinIO, Kafka, React, tRPC та Fastify.

## Структура проекту

Проект використовує монорепозиторій на основі Turborepo та PNPM.

### Пакети (packages)

- `shared-lib`: Спільні компоненти, типи та утиліти
- `ui-components`: Бібліотека React-компонентів
- `config`: Спільні конфігурації (eslint, tsconfig)

### Застосунки (apps)

- `api`: Backend API на основі Fastify та tRPC
- `web`: Веб-клієнт на основі React

## Початок роботи

### Передумови

- Node.js >= 22.0.0
- PNPM >= 10.12.1
- Docker і Docker Compose для локальних сервісів

### Встановлення

```bash
# Клонувати репозиторій
git clone https://github.com/your-username/file-platform.git
cd file-platform

# Встановити залежності
pnpm install

# Запустити локальні сервіси (Postgres, MinIO, Kafka)
docker-compose up -d

# Запустити розробницький режим
pnpm dev
```

## Версіонування

Проект використовує Changesets для версіонування пакетів. Для створення нового релізу:

```bash
# Створити changeset
pnpm changeset

# Оновити версії пакетів
pnpm version-packages

# Опублікувати нові версії
pnpm release
```

## Корисні команди

- `pnpm build`: Збудувати всі пакети та застосунки
  - Запустіть pnpm install в корені проєкту
  - Налаштувати i підняти Docker & DB в apps/api (див. READ.me там)
  - Запустити команду на збірку
- `pnpm lint`: Запустити лінтінг у всіх проектах
- `pnpm format`: Форматувати код у всіх проектах
- `pnpm clean`: Очистити всі тимчасові файли та кеш
- `pnpm reset-hard`: Повне скидання стану проекту

## Архітектура

- **API сервер**: Fastify з tRPC для типізованого API між клієнтом та сервером
- **Файлове сховище**: MinIO для об'єктного сховища файлів
- **Події та інтеграції**: Kafka для асинхронних подій
- **База даних**: PostgreSQL з Prisma ORM
- **Фронтенд**: React з tRPC клієнтом
