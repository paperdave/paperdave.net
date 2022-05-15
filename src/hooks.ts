import { getDatabase } from '$lib/db';
import { Token, User } from '$lib/structures';
import type { Handle } from '@sveltejs/kit';

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
    if (!response.headers.has(key)) {
      response.headers.set(key, value);
    }
  }

  // if (response.headers.get('Content-Type') === 'text/html') {
  //   const minified = await minify(await response.text(), {
  //     collapseWhitespace: true,
  //     minifyCSS: true,
  //     minifyJS: true,
  //   });
  //   return new Response(minified, {
  //     headers: response.headers,
  //     status: response.status,
  //   });
  // }

  return response;
};
