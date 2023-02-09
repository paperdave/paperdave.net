import { formatDate } from 'src/date';
import { db } from 'src/db.server';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ request }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result =
    (await db.$queryRaw`SELECT date FROM "Question" WHERE "type" = 'Normal' ORDER BY RANDOM() LIMIT 1`) as [
      {
        date: string;
      }
    ];

  const url = `/q+a/${formatDate(new Date(result[0].date), 'question-id')}`;

  if (request.headers.get('Accept') === 'text/plain') {
    return new Response(url, { status: 200, headers: { 'Content-Type': 'text/plain' } });
  }

  return new Response(
    `Redirecting to ${url}...\n\nIf you are not redirected, click <a href="${url}">here</a>.`,
    {
      status: 302,
      headers: {
        Location: url,
        'Content-Type': 'text/html'
      }
    }
  );
};
