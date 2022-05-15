import { getDatabase } from '$lib/db';
import {
  parseQuestionDateId,
  Permission,
  Question,
  QuestionParagraph,
  QuestionRequest,
} from '$lib/structures';
import type { GenericSuccess } from '$lib/utils/api';
import { escapeHTML } from '$lib/utils/escape';
import type { Dict } from '@davecode/structures/dist/helper-types';
import type { RequestHandler, RequestHandlerOutput } from '@sveltejs/kit';

interface Params extends Dict<string> {
  qid: string;
}

/**
 * Retrives a Question by it's question date id.
 *
 * - If it does not exist, a 404 is returned
 */
export const get: RequestHandler<Params> = async ({ params }) => {
  const id = params.qid;

  const match = parseQuestionDateId(id);

  if (!match) {
    return {
      status: 404,
      body: {
        error: 'Question not found',
      },
    };
  }

  const questionDb = await getDatabase(Question);
  const question = await questionDb.findOne({
    date: { $eq: match.getTime() },
  });

  if (!question) {
    const requestDb = await getDatabase(QuestionRequest);
    const request = await requestDb.findOne({
      date: { $gt: match.getTime() },
    });

    if (request) {
      return {
        body: new Question({
          content: [
            new QuestionParagraph({
              who: 'QUESTION',
              message: escapeHTML(request.content),
            }),
          ],
        }).toJSON(),
      };
    } else {
      return {
        status: 404,
        body: {
          error: 'Question not found',
        },
      };
    }
  }

  return {
    body: question.toJSON(),
  } as RequestHandlerOutput;
};

export interface QuestionPostSuccess extends GenericSuccess {
  insertedId: string;
}

/**
 * Creates a new question.
 *
 * - Requires the `RESPOND_TO_QUESTIONS` permission.
 * - The posted question's date must match the id given.
 * - If the question id is already taken, the question's date will be shifted a second later.
 * - The response contains the ACTUAL id of the question.
 */
export const post: RequestHandler<Params> = async ({ locals, params, request }) => {
  if (!locals.user.queryPermission(Permission.RESPOND_TO_QUESTIONS)) {
    return {
      status: 403,
      body: { error: 'You do not have permission to create questions' },
    };
  }

  const dateId = params.qid;
  const question = Question.fromJSON(await request.json());

  if (question.getDateId() !== dateId) {
    return {
      status: 400,
      body: { error: 'Question date does not match url parameter' },
    };
  }

  const db = await getDatabase(Question);

  while (
    await db.findOne({
      date: { $eq: question.date.getTime() },
    })
  ) {
    question.date.setTime(question.date.getTime() + 1000);
  }

  await db.insertOne(question);

  return {
    status: 200,
    body: {
      success: true,
      insertedId: question.getDateId(),
    },
  };
};

// TODO: maybe write delete/patch/put apis, though these are not really needed.
