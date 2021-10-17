import { getDatabase, stripDatabaseInternals } from '$lib/db';
import { Question } from '$lib/structures';
import { RequestHandler } from '@sveltejs/kit';

const PAGE_SIZE = 10;

export const get: RequestHandler = async ({ query }) => {
  const questionDB = await getDatabase(Question);

  const search = query.get('q') ?? '';

  const questions = await questionDB
    .aggregate([
      {
        $search: {
          index: 'default',
          text: {
            query: search,
            path: {
              wildcard: '*',
            },
          },
        },
      },
      {
        $limit: 20,
      },
    ])
    .limit(PAGE_SIZE)
    .toArray();

  return {
    body: {
      questions: stripDatabaseInternals(questions),
    },
  };
};
