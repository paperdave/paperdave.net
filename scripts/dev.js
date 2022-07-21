import chalk from 'chalk';
import { run } from './utils.js';

console.clear();
console.log(chalk.greenBright('paperdave.net dev server loading'));

// await run('prisma migrate dev', true, true);

console.log('listening on port 3000');
console.clear();
console.log(chalk.greenBright('paperdave.net dev server loaded'));

process.argv = process.argv.slice(0, 2).concat('dev');
import('../node_modules/@sveltejs/kit/dist/cli.js');
run('prisma studio --browser none', false);
