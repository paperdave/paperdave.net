import { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({}) => {
  throw new Error('This url emits an error. This is intentional.');
};
