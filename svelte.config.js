import content from '@originjs/vite-plugin-content';
import svgSvelte from '@poppanator/sveltekit-svg';
import adapter from '@sveltejs/adapter-auto';
import blurhashImage from 'blurhash-image';
import 'dotenv/config';
import fs from 'fs';
import preprocess from 'svelte-preprocess';

// Modified template with blurhash script
if (!fs.existsSync('.svelte-kit')) {
  fs.mkdirSync('.svelte-kit');
}
fs.writeFileSync(
  '.svelte-kit/app.html',
  fs
    .readFileSync('src/app.html', 'utf8')
    .toString()
    .replace(/<\/head>/, `<script>${blurhashImage}</script></head>`)
);

/** @type {import('@sveltejs/kit').Config} */
const conf = {
  extensions: ['.svelte', '.svx'],
  preprocess: [
    preprocess({
      scss: {
        prependData: "@import 'src/lib/util';",
        sourceMap: true,
      },
      sourceMap: true,
    }),
  ],
  onwarn: () => {},
  kit: {
    files: {
      template: '.svelte-kit/app.html',
    },
    adapter: adapter(),
    vite: {
      build: {
        sourcemap: true,
      },
      define: {
        'import.meta.env.SOURCE_ROOT': JSON.stringify(process.cwd()),
      },
      optimizeDeps: {
        exclude: ['canvas', 'sharp'],
      },
      plugins: [svgSvelte(), content.default()],
    },
  },
};

export default conf;
