# File Platform API

Проєкт File Platform API - це серверна частина платформи для управління файлами, що використовує tRPC, PostgreSQL, MinIO та Kafka.

## Передумови

Переконайтеся, що у вас установлено:

- Node.js >=22.0.0
- pnpm 10.12.1 або новіше
- PostgreSQL
- MinIO Server
- Kafka
- Docker

## Встановлення

1. Клонуйте репозиторій:
   bash git clone [url-репозиторію] cd file-platform

2. Встановіть залежності:
   pnpm install

3. Створіть файл `.env` в корені проєкту:

   # PostgreSQL

   DATABASE_URL="postgresql://[user]:[password]@localhost:5432/file_platform"

   # MinIO

   MINIO_ENDPOINT="localhost"
   MINIO_PORT="9000"
   MINIO_ACCESS_KEY="minioadmin"
   MINIO_SECRET_KEY="minioadmin"

   # Kafka

   KAFKA_BROKER=localhost:9092

4. Налаштуйте базу даних:

   # Застосуйте міграції Prisma (коли запустите проєкт)

   npx prisma migrate dev

   # Згенеруйте (для нових змін) Prisma Client

   npx prisma generate

## Запуск

    Запустіть команду pnpm dev:api
