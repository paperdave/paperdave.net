import content from '@originjs/vite-plugin-content';
import svgSvelte from '@poppanator/sveltekit-svg';
import adapter from '@sveltejs/adapter-auto';
import 'dotenv/config';
import fs from 'fs-extra';
import preprocess from 'svelte-preprocess';

fs.ensureDirSync('./.svelte-kit');
fs.writeFileSync(
  '.svelte-kit/app.html',
  fs
    .readFileSync('src/app.html', 'utf8')
    .toString()
    .replace(/%blurhash%/, () => fs.readFileSync('src/lib/vendor/blurhash-image.js', 'utf8'))
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
        'process.env.INDEX': JSON.stringify(process.env.INDEX),
      },
      plugins: [svgSvelte(), content.default()],
    },
  },
};

export default conf;
