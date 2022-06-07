import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';
import { webcrypto } from 'crypto';
global.crypto = webcrypto;

const db = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL_PROD ?? process.env.DATABASE_URL,
    }
  }
});

await fs.rm('prisma/sample', { force: true, recursive: true });
await fs.mkdir('prisma/sample', { recursive: true });

async function run(tableName, where = { unlisted: false }, select = undefined) {
  const arg = {};
  if (where) arg.where = where;
  if (select) arg.select = select;
  const data = await db[tableName].findMany(arg);
  return fs.writeFile(`prisma/sample/${tableName}.json`, JSON.stringify(data, null, 2));
}

await Promise.all([
  run('artifactEntry'),
  run('music'),
  run('story'),
  run('video'),
  run('game'),
  run('application'),

  run('upload', false, false),
  run('donator', false, false),
])
