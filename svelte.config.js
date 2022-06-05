import content from '@originjs/vite-plugin-content';
import svgSvelte from '@poppanator/sveltekit-svg';
import adapter from '@sveltejs/adapter-auto';
import blurhashImage from 'blurhash-image';
import 'dotenv/config';
import fs from 'fs';
import preprocess from 'svelte-preprocess';
import { minify } from 'html-minifier-terser';

// Modified template with blurhash script
if (!fs.existsSync('.svelte-kit')) {
  fs.mkdirSync('.svelte-kit');
}
fs.writeFileSync(
  '.svelte-kit/app.html',
  await minify(fs
    .readFileSync('src/app.html', 'utf8')
    .toString()
    .replace(/<\/head>/, `<script>${blurhashImage}</script></head>`), {
      caseSensitive: true,
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      conservativeCollapse: false,
      decodeEntities: true,
      removeOptionalTags: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
      removeTagWhitespace: true,
      removeComments: true,
      minifyCSS: true,
      minifyJS: true,
    })
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
        'import.meta.env.SOURCE_ROOT': JSON.stringify(process.cwd()),
      },
      optimizeDeps: {
        exclude: ['canvas', 'sharp'],
      },
      plugins: [svgSvelte(), content.default()],
    },
  },
};

export default conf;
