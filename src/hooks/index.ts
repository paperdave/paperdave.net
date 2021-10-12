import { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ request, resolve }) => {
  const response = await resolve(request);

  return {
    ...response,
    headers: {
      ...response.headers,
      'X-Powered-By': 'chocolate; see https://davecode.me/donate',
    },
  };
};

export 