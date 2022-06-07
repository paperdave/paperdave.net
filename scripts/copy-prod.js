import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';
import { webcrypto } from 'crypto';
global.crypto = webcrypto;

const prod = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL_PROD,
    }
  }
});
const local = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    }
  }
});

const tables = [
  ['artifactEntry', 'id'],
  ['video', 'id'],
  ['music', 'id'],
  ['story', 'id'],
  ['game', 'id'],
  ['message', 'date'],
  ['application', 'id'],
];

for (const [table, primary] of tables) {
  console.log(`Copying ${table}`);
  const prodData = await prod[table].findMany();
  await local.$transaction(
    prodData.map(
      data => local[table].upsert({
        where: {
          [primary]: data[primary]
        },
        create: data,
        update: {},
      })
    )
  )
}