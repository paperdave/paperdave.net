import type { RequestHandler } from '@sveltejs/kit';

export interface ForgotPasswordRequest {
  email: string;
}

export const post: RequestHandler = async ({ locals }) => {
  // TODO: write this in.

  return {
    status: 501,
    body: {
      error: 'Not implemented',
    },
  };
};
