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
