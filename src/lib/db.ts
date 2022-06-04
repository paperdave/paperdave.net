import { PrismaClient } from '@prisma/client';
import { DATABASE_URL } from './env';

export const db = new PrismaClient({
  datasources: {
    db: {
      url: DATABASE_URL,
    },
  },
});

export function ensurePrismaIsSetup() {
  // magic function...
}