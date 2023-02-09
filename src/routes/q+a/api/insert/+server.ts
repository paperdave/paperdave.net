/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Message } from '@prisma/client';
import { json, type RequestHandler } from '@sveltejs/kit';
import { db } from 'src/db.server';
import type { ASTNode } from 'svelte-simple-markdown';
import { assertAuthorized } from '../../_lib/auth';
import { messageMarkdown } from '../../_lib/markdown';
import { parseMessageDateID } from '../../_lib/utils';

function walkAst(astNode: ASTNode): any {
  if (Array.isArray(astNode.content)) {
    return astNode.content.map(walkAst).flat();
  } else if (astNode.type === 'mentionArtifact') {
    return [{ artifact: astNode.id }];
  } else if (astNode.type === 'mentionMessage') {
    return [{ message: astNode.id }];
  } else return [];
}

export const POST: RequestHandler = async ({ request }) => {
  assertAuthorized();

  const body: Message = await request.json();
  body.date = new Date(body.date);
  body.text = body.text ?? '';

  const parsed = messageMarkdown.parser(body.text);
  const mentions = walkAst({ type: 'document', content: parsed });
  const mentionedQuestions = mentions
    .filter((m: any) => m.message)
    .map((m: any) => ({ date: parseMessageDateID(m.message) }));
  const mentionedArtifacts = mentions
    .filter((m: any) => m.artifact)
    .map((m: any) => ({ id: m.artifact }));

  db.$transaction([
    db.message.upsert({
      where: {
        date: body.date
      },
      create: {
        ...body,
        mentionedQuestions: {
          connect: mentionedQuestions
        },
        mentionedArtifacts: {
          connect: mentionedArtifacts
        }
      },
      update: {
        ...body,
        mentionedQuestions: {
          connect: mentionedQuestions
        },
        mentionedArtifacts: {
          connect: mentionedArtifacts
        }
      }
    }),
    db.messageInput.deleteMany({
      where: {
        date: body.date
      }
    })
  ]);

  return json({ ok: true });
};
