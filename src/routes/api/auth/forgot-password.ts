import { APIHandler, GenericSuccess } from '$lib/utils/api';

export interface ForgotPasswordRequest {
  email: string;
}

export const post: APIHandler<ForgotPasswordRequest, GenericSuccess> = async ({ body, locals }) => {
  // TODO: write this in.

  return {
    status: 200,
    body: {
      success: true,
    },
  };
};
