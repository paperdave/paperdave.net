import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

console.log(process.env.NODE_ENV);

const config: UserConfig = {
  plugins: [sveltekit()],
  optimizeDeps: {
    include: ['sswr']
  },
  resolve: {
    alias: {
      '@prisma/client':
        process.env.NODE_ENV === 'production' ? '@prisma/client' : '@prisma/client/edge'
    }
  }
};

export default config;
