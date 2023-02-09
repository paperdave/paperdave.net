import { error } from '@sveltejs/kit';
import { db } from 'src/db.server';
import { parseDateID } from '../_lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params: { id } }) => {
  const date = parseDateID(id);
  if (!date) throw error(404, 'Not found');
  const find = await db.question.findFirst({
    where: {
      date
    },
    include: {
      mentionedArtifacts: {
        select: {
          id: true,
          title: true,
          type: true
        }
      },
      mentionedQuestions: true
    }
  });
  if (!find) {
    const find2 = await db.questionInput.findFirst({
      where: {
        date
      }
    });
    if (find2) {
      return { question: null, isPending: true };
    }
    return { question: null, isPending: false };
  }

  return {
    question: {
      ...find,
      artifacts:
        find.mentionedArtifacts.length > 0
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            find.mentionedArtifacts.reduce<any>((acc, { id, title, type }) => {
              acc[id] = { title, type };
              return acc;
            }, {})
          : undefined
    },
    isPending: false
  };
};
