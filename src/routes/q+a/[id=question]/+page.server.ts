import type { Message } from '@prisma/client';
import { error } from '@sveltejs/kit';
import { db } from 'src/db.server';
import { parseMessageDateID } from '../_lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params: { id } }) => {
  const date = parseMessageDateID(id);
  if (!date) throw error(404, 'Not found');
  const find = await db.message.findFirst({
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
      mentionedMessages: true
    }
  });
  if (!find) {
    const find2 = await db.messageInput.findFirst({
      where: {
        date
      }
    });
    if (find2) {
      return { message: null, isPending: true };
    }
    return { message: null, isPending: false };
  }

  return {
    message: {
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
