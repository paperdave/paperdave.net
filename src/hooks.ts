import { Handle } from '@sveltejs/kit';
import { minify } from 'html-minifier';

const htmlMinificationOptions = {
  collapseBooleanAttributes: true,
  collapseWhitespace: true,
  decodeEntities: true,
  html5: true,
  minifyCSS: true,
  minifyJS: true,
  removeAttributeQuotes: true,
  removeComments: false,
  removeOptionalTags: false,
  removeRedundantAttributes: true,
  removeStyleLinkTypeAttributes: true,
  sortAttributes: false,
  sortClassName: false,
  removeEmptyElements: false,
};

export const handle: Handle = async ({ request, resolve }) => {
  const response = await resolve(request);

  if (response.headers['content-type'] === 'text/html' && response.body) {
    response.body = minify(response.body.toString(), htmlMinificationOptions);
  }

  return {
    ...response,
    headers: {
      ...response.headers,

      // Powered by easter egg :3
      'X-Powered-By': 'chocolate; see https://davecode.net/donate',

      // CORS headers for potential cross origin requests
      // Read more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PUT, PATCH, DELETE, POST',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',

      // Vercel Cache headers, by default, theres no cache for some reason
      // so we have to manually set it here.
      // Read more: https://vercel.com/docs/concepts/edge-network/caching#
      ...(request.method === 'GET' && {
        'Cache-Control': 's-maxage=30, stale-while-revalidate=500',
      }),
    },
  };
};
