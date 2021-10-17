import { COOKIE_SECRET } from '$lib/env';
import { GetSession } from '@sveltejs/kit';
import { handleSession } from 'svelte-kit-cookie-session';

export const handle = handleSession(
  {
    secret: COOKIE_SECRET,
    rolling: true,
  },
  async ({ request, resolve }) => {
    const response = await resolve(request);

    return {
      ...response,
      headers: {
        ...response.headers,
        'X-Powered-By': 'chocolate; see https://davecode.net/donate',
      },
    };
  }
);

export const getSession: GetSession = ({ locals }) => {
  return locals.session.data;
};
