import { PrismaClient } from '@prisma/client';
import { DATABASE_URL } from '$env/static/private';

export const db = new PrismaClient({
  datasources: {
    db: {
      url: DATABASE_URL
    }
  }
});
