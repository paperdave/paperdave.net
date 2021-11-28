import { isSameOrigin } from '$lib/utils/api';
import { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ request, resolve }) => {
  const sameOrigin = isSameOrigin(request.headers.origin);
  const response = await resolve(request);

  const doCache = request.method === 'GET';

  return {
    ...response,
    headers: {
      ...response.headers,
      'X-Powered-By': 'chocolate; see https://davecode.net/donate',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': sameOrigin ? 'GET, PUT, PATCH, DELETE, POST' : 'GET',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
      ...(doCache && {
        'Cache-Control': 's-maxage=30, stale-while-revalidate=500',
      }),
    },
  };
};
