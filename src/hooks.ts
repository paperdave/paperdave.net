import { getDatabase } from '$lib/db';
import { User } from '$lib/structures';
import { Handle } from '@sveltejs/kit';
import { minify } from 'html-minifier';

export const EXPIRE_TIME = 1000 * 60 * 60 * 24 * 7;

const htmlMinificationOptions = {
  caseSensitive: true,
  collapseBooleanAttributes: true,
  collapseWhitespace: true,
  conservativeCollapse: false,
  decodeEntities: true,
  removeComments: true,
  removeOptionalTags: true,
  removeAttributeQuotes: true,
  removeRedundantAttributes: true,
  minifyCSS: true,
  minifyJS: false,
  // Yes, i understand this minification trick. I don't care about incompatibility.
  removeTagWhitespace: true,
  // Yes, i know this can break spacing.
  collapseInlineTagWhitespace: true,
};

const overrideHeaders = {
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
  'Cache-Control': 's-maxage=30, stale-while-revalidate=500',
};

function createErrorResponse(statusCode: number, message: string) {
  return {
    status: statusCode,
    headers: {
      ...overrideHeaders,
      'Content-Type': 'application/json',
    },
    body: Buffer.from(
      JSON.stringify({
        error: 'Token Expired',
      })
    ),
  };
}

export interface Token {
  token: string;
  email: string;
  expires: number;
}

export const handle: Handle = async ({ request, resolve }) => {
  request.locals.user = new User() //
    .setName('Guest')
    .setEmail('noreply@davecode.net');

  if (request.headers.authorization) {
    const match = request.headers.authorization.match(/^Bearer (.*)$/);
    if (match) {
      const token = match[1];

      const tokenDb = await getDatabase<Token>({ structureName: 'tokens' });
      const tokenData = await tokenDb.findOne({ token });
      if (!tokenData) {
        return createErrorResponse(401, 'Invalid Token');
      }

      if (tokenData.expires < Date.now()) {
        return createErrorResponse(401, 'Token Expired');
      }

      const userDb = await getDatabase(User);
      const userData = await userDb.findOne({ email: tokenData.email });
      if (!userData) {
        return createErrorResponse(401, 'Invalid Token');
      }

      request.locals.user = User.fromJSON(userData);

      await tokenDb.updateOne(
        { _id: tokenData._id },
        { $set: { expires: Date.now() + EXPIRE_TIME } }
      );
    } else {
      return createErrorResponse(400, 'Unsupported Authorization Format');
    }
  }

  const response = await resolve(request);

  if (response.headers['content-type'] === 'text/html' && response.body) {
    response.body = minify(response.body.toString(), htmlMinificationOptions);
  }

  return {
    ...response,
    headers: {
      ...response.headers,
      ...overrideHeaders,
    },
  };
};
