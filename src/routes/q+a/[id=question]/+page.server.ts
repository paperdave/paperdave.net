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
      mentionedArtifacts: true,
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
  }
  return { message: find, isPending: false };
};
