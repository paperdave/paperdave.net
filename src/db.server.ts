import { PrismaClient } from '@prisma/client';
import * as env from '$env/static/private';

export const db = new PrismaClient({
  datasources: {
    db: {
      url: (env as any).DATABASE_URL
    }
  }
});
