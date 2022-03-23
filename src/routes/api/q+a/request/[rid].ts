import { getDatabase } from '$lib/db';
import { parseQuestionDateId, Permission, QuestionRequest } from '$lib/structures';
import { Dict } from '@davecode/structures/dist/helper-types';
import { RequestHandler, RequestHandlerOutput } from '@sveltejs/kit';

interface Params extends Dict<string> {
  rid: string;
}

/**
 * Gets a question request by it's date id.
 *
 * - Requires the `RESPOND_TO_QUESTIONS` permission.
 */
export const get: RequestHandler<Params> = async ({ params, locals }) => {
  if (!locals.user.queryPermission(Permission.RESPOND_TO_QUESTIONS)) {
    return {
      status: 403,
      body: {
        error: 'You do not have permission to view question requests',
      },
    };
  }

  const id = params.rid;
  const db = await getDatabase(QuestionRequest);
  const parsed = parseQuestionDateId(id);
  const request = await db.findOne({
    date: {
      $gte: parsed?.getTime(),
      $lt: (parsed?.getTime() ?? 0) + 1000,
    },
  });

  if (!request) {
    return {
      status: 404,
      body: {
        error: 'Request not found',
      },
    };
  }

  return {
    status: 200,
    body: QuestionRequest.fromJSON(request).toJSON(),
  } as RequestHandlerOutput;
};

/**
 * Delete a question request.
 *
 * - Requires the `RESPOND_TO_QUESTIONS` permission.
 */
export const del: RequestHandler<Params> = async ({ params, locals }) => {
  if (!locals.user.queryPermission(Permission.RESPOND_TO_QUESTIONS)) {
    return {
      status: 403,
      body: {
        error: 'You do not have permission to delete question requests',
      },
    };
  }

  const id = params.rid;
  const db = await getDatabase(QuestionRequest);
  const parsed = parseQuestionDateId(id);
  const request = await db.findOne({
    date: {
      $gte: parsed?.getTime(),
      $lt: (parsed?.getTime() ?? 0) + 1000,
    },
  });

  if (!request) {
    return {
      status: 404,
      body: {
        error: 'Request not found',
      },
    };
  }

  await db.deleteOne(request);

  return {
    status: 200,
    body: {
      success: true,
    },
  };
};
