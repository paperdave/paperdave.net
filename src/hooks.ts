import { REALM_TOKEN } from '$lib/env';
import { Handle } from '@sveltejs/kit';
import { handleSession } from 'svelte-kit-cookie-session';

export const EXPIRE_TIME = 1000 * 60 * 60 * 24 * 7;

const overrideHeaders = {
  // Powered by easter egg :3
  'X-Powered-By': 'chocolate; see https://davecode.net/donate',
  'Cache-Control': 'public, maxage=3600, stale-while-revalidate=3600',
};

function createErrorResponse(statusCode: number, message: string) {
  const response = new Response(
    JSON.stringify({
      error: message,
    }),
    {
      status: statusCode,
    }
  );

  for (const [key, value] of Object.entries(overrideHeaders)) {
    response.headers.set(key, value);
  }

  return response;
}

export interface Token {
  token: string;
  email: string;
  expires: number;
}

export const handle: Handle = handleSession(
  {
    secret: REALM_TOKEN,
  },
  async ({ event, resolve }) => {
    const response = await resolve(event);

    for (const [key, value] of Object.entries(overrideHeaders)) {
      if (!response.headers.has(key)) {
        response.headers.set(key, value);
      }
    }

    return response;
  }
);
