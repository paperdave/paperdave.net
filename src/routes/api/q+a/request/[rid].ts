import { getDatabase } from '$lib/db';
import { Permission, Question, QuestionRequest } from '$lib/structures';
import { GenericSuccess, GetAPIHandler } from '$lib/utils/api';

/**
 * Gets a question request by it's date id.
 *
 * - Requires the `RESPOND_TO_QUESTIONS` permission.
 */
export const get: GetAPIHandler<QuestionRequest> = async ({ params, locals }) => {
  if (!locals.user.queryPermission(Permission.RESPOND_TO_QUESTIONS)) {
    return {
      status: 403,
      body: {
        error: 'You do not have permission to view question requests',
      },
    };
  }

  const id = params.id;
  const db = await getDatabase(QuestionRequest);
  const parsed = Question.parseDateId(id);
  const request = await db.findOne({ date: parsed?.getDate() });

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
  };
};

/**
 * Delete a question request.
 *
 * - Requires the `RESPOND_TO_QUESTIONS` permission.
 */
export const del: GetAPIHandler<GenericSuccess> = async ({ params, locals }) => {
  if (!locals.user.queryPermission(Permission.RESPOND_TO_QUESTIONS)) {
    return {
      status: 403,
      body: {
        error: 'You do not have permission to delete question requests',
      },
    };
  }

  const id = params.id;
  const db = await getDatabase(QuestionRequest);
  const parsed = Question.parseDateId(id);
  const request = await db.findOne({ date: parsed?.getDate() });

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
