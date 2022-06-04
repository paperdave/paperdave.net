import { PrismaClient } from '@prisma/client';
import { DATABASE_URL } from './env';

console.log('prisma client')
export const db = new PrismaClient({
  datasources: {
    db: {
      url: DATABASE_URL,
    },
  },
});
