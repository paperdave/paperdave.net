import fs from 'fs';

console.log('Patching SvelteKit');

fs.copyFileSync(
  './patches/sveltekit-start.js',
  './node_modules/@sveltejs/kit/assets/runtime/internal/start.js'
);

import('../node_modules/@sveltejs/kit/dist/cli.js');
