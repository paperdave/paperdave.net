import content from '@originjs/vite-plugin-content';
import vercel from '@sveltejs/adapter-vercel';
import { mdsvex } from 'mdsvex';
import preprocess from 'svelte-preprocess';
import svgSvelte from 'vite-plugin-svelte-svg';

/** @type {import('@sveltejs/kit').Config} */
const conf = {
  extensions: ['.svelte', '.svx'],
  preprocess: [
    mdsvex({
      smartypants: true,
    }),
    preprocess({
      scss: {
        prependData: "@import 'src/lib/util';",
      },
    }),
  ],
  kit: {
    adapter: vercel(),
    target: 'body',
    vite: {
      plugins: [svgSvelte(), content.default()],
    },
  },
};

export default conf;
