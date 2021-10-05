import { RequestHandler } from '@sveltejs/kit';
import { readdir } from 'fs-extra';

export const get: RequestHandler = async ({}) => {
  const files = (await readdir('src/routes/learning-svelte'))
    .filter((x) => x.endsWith('.svelte'))
    .map((x) => x.replace('.svelte', ''))
    .filter((x) => x !== 'index');

  return {
    body: files,
  };
};
