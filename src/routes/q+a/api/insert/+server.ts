/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Question } from '@prisma/client';
import { json, type RequestHandler } from '@sveltejs/kit';
import { formatDate } from 'src/date';
import { db } from 'src/db.server';
import { sendEmail } from 'src/sendgrid.server';
import type { ASTNode } from 'svelte-simple-markdown';
import { assertAuthorized } from '../../_lib/auth';
import { messageMarkdown } from '../../_lib/markdown';
import { parseDateID } from '../../_lib/utils';

function walkAst(astNode: ASTNode): any {
  if (Array.isArray(astNode.content)) {
    return astNode.content.map(walkAst).flat();
  } else if (astNode.type === 'mentionArtifact') {
    return [{ artifact: astNode.id }];
  } else if (astNode.type === 'mentionQuestion') {
    return [{ question: astNode.id }];
  } else return [];
}

export const POST: RequestHandler = async ({ request }) => {
  assertAuthorized();

  const body: Question = await request.json();
  body.date = new Date(body.date);
  body.text = body.text ?? '';

  const parsed = messageMarkdown.parser(body.text);
  const mentions = walkAst({ type: 'document', content: parsed });
  const mentionedQuestions = mentions
    .filter((m: any) => m.question)
    .map((m: any) => ({ date: parseDateID(m.question) }));
  const mentionedArtifacts = mentions
    .filter((m: any) => m.artifact)
    .map((m: any) => ({ id: m.artifact }));

  db.$transaction([
    db.question.upsert({
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
    db.questionInput.deleteMany({
      where: {
        date: body.date
      }
    })
  ]);

  const email = request.headers.get('x-notify-email');
  if (email) {
    await sendEmail({
      to: email,
      subject: 'your question was ' + (body.type === 'NORMAL' ? 'answered!' : 'rejected'),
      html: `<!doctype html>
<link href="https://fonts.googleapis.com/css2?family=Recursive&display=swap" rel="stylesheet">
<style>
body { font-family: 'Recursive', sans-serif; }
</style>

<p>hi,</p>
${
  body.type === 'NORMAL'
    ? `
<p>your question sent at ${formatDate(body.date, 'date-time')} (EST) was answered<br>
view it here: <a href="https://paperdave.net/q+a/${formatDate(
        body.date,
        'message-id'
      )}">https://paperdave.net/q+a/${formatDate(body.date, 'message-id')}</a></p>`
    : `
<p>your question was rejected and will not be published.<br>
yikes. this is awkward.</p>
`
}
<p>have a nice day,<br>mailbot</p>

<p style='margin-top:32px;max-width:450px;opacity:0.88'>
  <small>this email was sent because [someone] put your email address under the "notify me" field on <a href="https://paperdave.net/q+a">the paperdave questions page</a>.</small><br>
  <small>support mail: <a href="mailto:me@paperdave.net">me@paperdave.net</a>.</small>
</p>`
    });
  }

  return json({ ok: true });
};
