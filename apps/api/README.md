# File Platform API

Проєкт File Platform API - це серверна частина платформи для управління файлами, що використовує tRPC, PostgreSQL, MinIO
та Kafka.

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

4. Запустіть збірку в Docker
   docker-compose up --build

5. Налаштуйте базу даних:

   # Застосуйте міграції Prisma (коли запустите збірку)

   npx prisma migrate dev

   # Згенеруйте (для нових змін) Prisma Client

   npx prisma generate

   # Скидання міграцій в Prisma Client
   
   npx prisma migrate reset


## Запуск

    Запустіть команду pnpm dev:api

## **API Документація**

### **Postman**

Колекції та оточення для Postman знаходяться в папці `docs/postman/`:

- `collections/` - колекції API запитів
- `environments/` - конфігурації оточень (local, dev, prod)

Як використовувати:

1. Імпортуйте колекцію з `docs/postman/collections/file-platform.postman_collection.json`
2. Імпортуйте потрібне оточення з `docs/postman/environments/`
3. Виберіть імпортоване оточення в Postman


## **CI/CD**

# Збірка в CI
   `docker build -f apps/api/Dockerfile -t your-registry/file-platform-api:latest .`
   `docker push your-registry/file-platform-api:latest`


## **Локальне тестування продакшн збірки:**

# Збудувати образ
docker build -f apps/api/Dockerfile -t api-local .

# Запустити з локальними сервісами
docker run --network file-platform-network -p 3001:3001 api-local
