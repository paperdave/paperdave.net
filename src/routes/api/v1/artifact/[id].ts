import { getDatabase } from '$lib/db';
import { Artifact, ArtifactVisibility, Permission } from '$lib/structures';
import { APIHandler, GenericSuccess, getProperties } from '$lib/utils/api';

/**
 * Retrives an artifact by it's id
 *
 * - Private artifacts will be invisible to the public, but returned if the user has the
 *   `VIEW_ARTIFACTS` permission.
 * - Draft artifacts will never be returned.
 * - If it does not exist, a 404 Error is returned.
 * - You can pass a `props` query parameter to return only the properties you want (separated by commas).
 */
export const get: APIHandler<void, Artifact> = async ({ params, locals, query }) => {
  const db = await getDatabase(Artifact);
  const id = params.id;
  const find = await db.findOne({ id });

  const artifact = find && Artifact.fromJSON(find);

  if (
    // Send 404 if the artifact does not exist
    !artifact ||
    // Send 404 if the artifact is private and the user does not have the `VIEW_ARTIFACTS` permission
    (artifact.visibility === ArtifactVisibility.PRIVATE &&
      !(await locals.session.queryPermission(Permission.VIEW_ARTIFACTS))) ||
    // Send 404 if the artifact is a draft
    artifact.visibility === ArtifactVisibility.DRAFT
  ) {
    return {
      status: 404,
      body: { error: 'Artifact not found' },
    };
  }

  return {
    status: 200,
    body: getProperties(artifact.toJSON(), query.get('props')),
  };
};

/**
 * Creates a new artifact.
 *
 * - Requires a user to be logged in.
 * - If the user does not have the `CREATE_ARTIFACTS` permission, a 403 Error is returned.
 * - The visibility of the artifact is automatically set to `DRAFT` no matter what.
 * - This does not allow overwriting an existing artifact.
 */
export const post: APIHandler<Artifact, GenericSuccess> = async ({ body }) => {
  const artifact = Artifact.fromJSON(body);
};

/**
 * Deletes an artifact by it's id.
 *
 * - Requires a user to be logged in.
 * - If the user does not have the `DELETE_ARTIFACTS` permission, a 403 Error is returned.
 * - If the artifact does not exist, a 404 Error is returned.
 */
export const del: APIHandler<void, GenericSuccess> = async ({ params }) => {
  //
};

/**
 * Updates an artifact by it's id.
 *
 * - Requires a user to be logged in.
 * - If the user does not have the `EDIT_ARTIFACTS` permission, a 403 Error is returned.
 * - If the artifact does not exist, a 404 Error is returned.
 */
export const put: APIHandler = async ({ params, body }) => {
  // todo
};

/**
 * Updates an artifact by it's id. This accepts a partial update.
 *
 * - Requires a user to be logged in.
 * - If the user does not have the `EDIT_ARTIFACTS` permission, a 403 Error is returned.
 * - If the artifact does not exist, a 404 Error is returned.
 */
export const patch: APIHandler = async ({ params, body }) => {
  // todo
};

/**
 * Retrives options.
 *
 * - GET is allowed from any origin.
 * - The rest can only be sent from the same origin.
 */
export const options: APIHandler = async () => {};
