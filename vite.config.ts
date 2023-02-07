import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import type { OutputAsset } from 'rollup';
import yaml from '@rollup/plugin-yaml';

const config: UserConfig = {
  plugins: [
    sveltekit(),
    yaml(),
    {
      name: 'paperdave.net',
      generateBundle(opts, bundle) {
        for (const key in bundle) {
          if (key.endsWith('css')) {
            const css = bundle[key] as OutputAsset;
            css.source = String(css.source).replace(/(?:\._([0-9a-zA-Z]+)){2,}/g, '._$1');
          }
        }
      }
    }
  ],
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
