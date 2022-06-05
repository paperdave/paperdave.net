import { ensurePrismaIsSetup } from '$lib/db';
import type { Handle } from '@sveltejs/kit';
import { minify } from 'html-minifier-terser';

export const EXPIRE_TIME = 1000 * 60 * 60 * 24 * 7;

const overrideHeaders = {
  // Powered by easter egg :3
  'X-Powered-By': 'chocolate; see https://davecode.net/donate',
  'Cache-Control': 'public, maxage=3600, stale-while-revalidate=3600',
};

export const handle: Handle = async ({ event, resolve }) => {
  await ensurePrismaIsSetup();
  const response = await resolve(event);

  for (const [key, value] of Object.entries(overrideHeaders)) {
    if (!response.headers.has(key)) {
      response.headers.set(key, value);
    }
  }

  if (response.headers.get('Content-Type') === 'text/html') {
    const minified = await minify(await response.text(), {
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
    });

    return new Response(minified, {
      headers: response.headers,
      status: response.status,
    });
  }

  return response;
};
