import { PrismaClient } from '@prisma/client';

export function createPrismaClient() {
  return new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });
}

export const prismaClient = createPrismaClient();
