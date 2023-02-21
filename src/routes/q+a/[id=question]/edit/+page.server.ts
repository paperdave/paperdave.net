import { error } from '@sveltejs/kit';
import { db } from 'src/db.server';
import { assertAuthorized } from '../../_lib/auth';
import { parseDateID } from '../../_lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params: { id } }) => {
  await assertAuthorized();
  const date = parseDateID(id);
  if (!date) throw error(404, 'Not found');

  const question = await db.question.findFirst({
    where: {
      date
    }
  });

  return {
    question
  };
};
