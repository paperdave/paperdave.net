import preprocess from 'svelte-preprocess';
import vercel from '@sveltejs/adapter-vercel';

export default {
  preprocess: preprocess(),
  kit: {
    adapter: vercel(),
    target: 'body'
  }
};
