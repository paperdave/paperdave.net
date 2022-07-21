import { db, ensurePrismaIsSetup } from '$lib/db';
import type { Handle } from '@sveltejs/kit';
import { minify } from 'html-minifier-terser';

export const EXPIRE_TIME = 1000 * 60 * 60 * 24 * 7;

const overrideHeaders = {
  // Powered by easter egg :3
  'X-Powered-By': 'chocolate; see https://paperdave.net/donate',
  'Cache-Control': 's-maxage=3600, maxage=3600, stale-while-revalidate=1728000',
};

export const handle: Handle = async ({ event, resolve }) => {
  await ensurePrismaIsSetup();
  await import('@ungap/structured-clone');

  const auth = event.request.headers.get('Authorization') ?? '';
  const match = auth.match(/^Bearer (.*)$/);
  if (match) {
    const session = await db.session.findFirst({
      where: {
        token: match[1]
      },
      include: {
        user: true
      },
    });

    if (session) {
      event.locals.user = session.user;
    } else {
      return new Response(JSON.stringify({ error: 'Your authorization token has expired.' }), {
        status: 401,
      });
    }
  }

  event.locals.assertAuthorized = () => {
    if (!event.locals.user) {
      throw new Response(JSON.stringify({ error: 'This route requires authorization.' }), {
        status: 401,
      });
    }
  };

  let response: Response;
  try {
    response = await resolve(event);
  } catch (error) {
    if (!(error instanceof Response)) {
      throw error
    }
    response = error;
  }

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
