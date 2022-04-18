import { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async (ev) => {
  return {
    body: {
      version: 'Hello World!',
    },
  };
};
