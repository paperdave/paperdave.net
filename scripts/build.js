import { run } from "./utils.js";

await run('prisma generate');
await run('svelte-kit build');
