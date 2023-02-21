import { ensureDirSync } from '@paperdave/utils';
import adapter from '@sveltejs/adapter-auto';
import { minify } from 'html-minifier';
import preprocess from 'svelte-preprocess';
import fs from 'fs';

const prod = process.env.NODE_ENV === 'production';

const tagsRegex1 = /(>)[\s]*([<{])/g;
const tagsRegex2 = /({[/:][a-z]+})[\s]*([<{])/g;
const tagsRegex3 = /({[#:][a-z]+ .+?})[\s]*([<{])/g;
const tagsRegex4 = /([>}])[\s]+(<|{[/#:][a-z][^}]*})/g;
const tagsReplace = (_, p1, p2) => p1 + p2;

if (prod) {
  ensureDirSync('.svelte-kit');
  const template = fs.readFileSync('src/app.html').toString();
  fs.writeFileSync(
    '.svelte-kit/app.html',
    minify(template, {
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true
    })
  );
}

let hash = 0;

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      scss: {
        prependData: '@import "src/lib/utils.scss";'
      },
      replace: [
        [tagsRegex1, tagsReplace],
        [tagsRegex2, tagsReplace],
        [tagsRegex3, tagsReplace],
        [tagsRegex4, tagsReplace]
      ]
    })
  ],

  compilerOptions: prod
    ? {
        cssHash: () => `_${(hash++).toString(36)}`
      }
    : {},

  kit: {
    alias: {
      src: 'src/'
    },
    adapter: adapter(),
    files: {
      appTemplate: prod ? '.svelte-kit/app.html' : 'src/app.html'
    }
  }
};

export default config;
