import preprocess from 'svelte-preprocess';
import vercel from '@sveltejs/adapter-vercel';
import svgSvelte from 'vite-plugin-svelte-svg';

/** @type {import('@sveltejs/kit').Config} */
const conf = {
  preprocess: preprocess({
    scss: {
      prependData: "@import 'src/lib/util';",
    },
  }),
  kit: {
    adapter: vercel(),
    target: 'body',
    vite: {
      plugins: [svgSvelte()],
    },
  },
};

export default conf;
