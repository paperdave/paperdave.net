import { APIHandler, GenericSuccess } from '$lib/utils/api';

/** Refreshes the users token. */
export const post: APIHandler<{}, GenericSuccess> = async ({}) => {
  // Token regeneration is handled by the authorization hook.
  return {
    status: 200,
    body: {
      success: true,
    },
  };
};
