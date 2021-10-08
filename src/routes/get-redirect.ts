import { RequestHandler } from '@sveltejs/kit';

import _redirectsList from './simple-redirects.yaml';

const redirectsList: Record<string, string> = _redirectsList;

export const get: RequestHandler = async ({ params }) => {
  const page = params.page ?? '';

  return {
    // body: { redirect: 'https://google.com/' + page },
    status: 404,
  };
};
