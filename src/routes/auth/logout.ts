import { ISession } from '$lib/structures/Session';
import { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler<Record<string, unknown>, FormData> = async ({ locals }) => {
  locals.session.data = {
    user: undefined,
  } as ISession;

  return {
    status: 302,
    headers: {
      Location: '/',
    },
  };
};
