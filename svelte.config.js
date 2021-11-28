import content from '@originjs/vite-plugin-content';
import vercel from '@sveltejs/adapter-vercel';
import { mdsvex } from 'mdsvex';
import preprocess from 'svelte-preprocess';
import svgSvelte from 'vite-plugin-svelte-svg';

/** @type {import('@sveltejs/kit').Config} */
const conf = {
  extensions: ['.svelte', '.svx'],
  preprocess: [
    preprocess({
      scss: {
        prependData: "@import 'src/lib/util';",
      },
    }),
    mdsvex({
      smartypants: true,
      layout: {
        _: './src/routes/blog/_SVXLayout.svelte',
      },
    }),
  ],
  kit: {
    adapter: vercel(),
    target: 'body',
    vite: {
      define: {
        'process.env.INDEX': JSON.stringify(process.env.INDEX),
      },
      plugins: [svgSvelte(), content.default()],
      optimizeDeps: {
        exclude: ['svelte-kit-cookie-session', 'mongodb', 'bson'],
      },
      resolve: {
        alias: {
          $vendor: process.cwd() + '/src/vendor',
        },
      },
    },
  },
};

export default conf;
