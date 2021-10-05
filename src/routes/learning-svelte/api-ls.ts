import { RequestHandler } from '@sveltejs/kit';
import * as fs from 'fs-extra';

export const get: RequestHandler = async ({}) => {
  const files = (await fs.readdir('src/routes/learning-svelte'))
    .filter((x) => x.endsWith('.svelte'))
    .map((x) => x.replace('.svelte', ''))
    .filter((x) => x !== 'index');

  return {
    body: files,
  };
};
