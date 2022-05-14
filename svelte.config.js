import content from '@originjs/vite-plugin-content';
import svgSvelte from '@poppanator/sveltekit-svg';
import adapterCloudflare from '@sveltejs/adapter-cloudflare';
import blurhashImage from 'blurhash-image';
import { webcrypto } from 'crypto';
import 'dotenv/config';
import fs from 'fs';
import preprocess from 'svelte-preprocess';

global.crypto = webcrypto;
global.XMLHttpRequest = class {
  open() {}
};
global.location = {};

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
    adapter: adapterCloudflare({
      banner: {
        // this fixes cloudflare builds. we provide a stub class so
        // https://github.com/ionic-team/rollup-plugin-node-polyfills/blob/master/polyfills/http-lib/capability.js#L20
        // and some other things properly run.
        js: ['globalThis.XMLHttpRequest=class{open(){}};', 'globalThis.location={};'].join(''),
      },
      define: Object.fromEntries(
        Object.entries(process.env)
          .filter(([key]) => !key.includes('('))
          .map(([key, value]) => [`process.env.${key}`, JSON.stringify(value)])
          .concat([
            ['process.env.NODE_ENV', JSON.stringify('production')],
            ['process.env', JSON.stringify({})],
          ])
      ),
      // minify: true,
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
