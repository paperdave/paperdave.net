import type { RequestHandler } from '@sveltejs/kit';

/** Refreshes the users token. */
export const post: RequestHandler = async ({}) => {
  // Token regeneration is handled by the authorization hook.
  return {
    status: 200,
    body: {
      success: true,
    },
  };
};
