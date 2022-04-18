import { RequestHandler } from '@sveltejs/kit';

export const post: RequestHandler = async ({ locals }) => {
  // TODO: write this in.

  return {
    status: 200,
    body: {
      success: true,
    },
  };
};
