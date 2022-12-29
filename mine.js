import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

const x = await db.message.findMany();
console.log(JSON.stringify(x, null, 2));
