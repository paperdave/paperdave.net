import { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ query }) => {
  const k = query.get('k') ?? '';

  return {
    body: { result: null },
  };
};
