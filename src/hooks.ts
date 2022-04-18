import { getDatabase } from '$lib/db';
import { Token, User } from '$lib/structures';
import { Handle } from '@sveltejs/kit';

export const EXPIRE_TIME = 1000 * 60 * 60 * 24 * 7;

const overrideHeaders = {
  // Powered by easter egg :3
  'X-Powered-By': 'chocolate; see https://davecode.net/donate',

  // CORS headers for potential cross origin requests
  // Read more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PUT, PATCH, DELETE, POST',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',

  // The following header is disabled for now, since we are not using Vercel.

  // Vercel Cache headers, by default, theres no cache for some reason
  // so we have to manually set it here.
  // Read more: https://vercel.com/docs/concepts/edge-network/caching#
  'Cache-Control': 'public,maxage=3600,stale-while-revalidate=3600',
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

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.user = new User({
    name: 'Guest',
    email: 'noreply@davecode.net',
    permissions: new Set(),
  });

  const auth = event.request.headers.get('Authorization');
  if (auth) {
    const match = auth.match(/^Bearer (.*)$/);
    if (match) {
      const token = match[1];

      const tokenDb = await getDatabase(Token);
      const tokenData = await tokenDb.findOne({ token });
      if (!tokenData) {
        return createErrorResponse(401, 'Invalid Token');
      }

      if (!tokenData.isValid()) {
        tokenDb.deleteOne({ token });
        return createErrorResponse(401, 'Token Expired');
      }

      const userDb = await getDatabase(User);
      const userData = await userDb.findOne({ email: tokenData.email });
      if (!userData) {
        return createErrorResponse(401, 'Invalid Token');
      }

      event.locals.user = userData;

      await tokenDb.replace(tokenData);
    } else {
      return createErrorResponse(400, 'Unsupported Authorization Format');
    }
  }

  const response = await resolve(event);

  for (const [key, value] of Object.entries(overrideHeaders)) {
    response.headers.set(key, value);
  }

  return response;
};
