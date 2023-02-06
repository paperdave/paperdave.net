import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import yaml from '@rollup/plugin-yaml';

const config: UserConfig = {
  plugins: [sveltekit(), yaml()],
  optimizeDeps: {
    include: []
  },
  resolve: {
    alias: {
      '@prisma/client':
        process.env.NODE_ENV === 'production' ? '@prisma/client/edge' : '@prisma/client'
    }
  }
};

export default config;
