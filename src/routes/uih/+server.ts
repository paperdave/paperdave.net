import type { RequestHandler } from './$types';

import redirects from '../../../redirects.yaml';
import { error } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
  if (redirects.static[url.pathname]) {
    return new Response(null, {
      status: 301,
      headers: {
        Location: redirects.static[url.pathname]
      }
    });
  }
};
