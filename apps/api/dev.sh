#!/bin/bash

# dev.sh
echo "🚀 Запуск API сервера в режимі розробки..."

NODE_ENV=development exec nodemon \
  --watch 'src/**/*.ts' \
  --ignore 'src/**/*.spec.ts' \
  --exec 'ts-node -r tsconfig-paths/register src/index.js' \
  | pino-pretty -c -l