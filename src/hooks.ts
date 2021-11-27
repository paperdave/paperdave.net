import { ServerWebSession } from '$lib/db/ServerWebSession';
import { COOKIE_SECRET } from '$lib/env';
import { JSONData, WebSession } from '$lib/structures';
import { GetSession } from '@sveltejs/kit';
import { handleSession } from 'svelte-kit-cookie-session';

export const handle = handleSession<{ session: JSONData<WebSession> }>(
  {
    secret: COOKIE_SECRET,
    rolling: true,
  },
  async ({ request, resolve }) => {
    const session = request.locals.session;

    const webSession = session.data.session
      ? ServerWebSession.fromJSON(session.data.session)
      : ServerWebSession.destroyedSession;

    (request.locals as any).session = webSession;
    const response = await resolve(request);

    if (session.data.session && webSession.destroyed) {
      session.destroy();
    } else if (!webSession.destroyed) {
      session.data.session = webSession.toJSON();
    }

    return {
      ...response,
      headers: {
        ...response.headers,
        'X-Powered-By': 'chocolate; see https://davecode.net/donate',
      },
    };
  }
);

export const getSession: GetSession = ({ locals }) => {
  return locals.session.data;
};
