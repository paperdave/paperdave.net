import content from '@originjs/vite-plugin-content';
import svgSvelte from '@poppanator/sveltekit-svg';
import adapterCloudflare from '@sveltejs/adapter-cloudflare';
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
    adapter: adapterCloudflare({
      define: Object.fromEntries(
        Object.entries(process.env)
          .filter(([key]) => !key.includes('('))
          .map(([key, value]) => [`process.env.${key}`, JSON.stringify(value)])
          .concat([
            ['process.env.NODE_ENV', JSON.stringify('production')],
            ['process.env', JSON.stringify({})],
          ])
      ),
      minify: true,
    }),
    vite: {
      build: {
        sourcemap: true,
      },
      plugins: [svgSvelte(), content.default()],
    },
  },
};

export default conf;
