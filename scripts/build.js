import { run } from "./utils.js";

await run('prisma migrate dev');
await run('svelte-kit build');
