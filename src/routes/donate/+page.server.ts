import { db } from 'src/db.server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({}) => {
  return {
    donators: (await db.donator.findMany()).map((x) => x.name)
  };
};
