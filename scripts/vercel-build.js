import { run } from "./utils.js";
import { copyFile, rm } from 'fs/promises';

process.env.VERCEL = 1;

await rm('.vercel_build_output', { recursive: true, force: true });
await run('prisma generate', false);
await run('prisma migrate deploy');
await run('svelte-kit build');
await copyFile('prisma/schema.prisma', '.vercel_build_output/functions/node/render/schema.prisma');
