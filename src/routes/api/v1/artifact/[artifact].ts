import { getDatabase } from '$lib/db';
import { Artifact, ArtifactVisibility, Permission } from '$lib/structures';
import { APIHandler, GenericSuccess, getProperties } from '$lib/utils/api';

/**
 * Retrives an artifact by it's id
 *
 * - Private or draft artifacts will be invisible to the public, but returned if the user has the
 *   `VIEW_ARTIFACTS` permission.
 * - If it does not exist, a 404 Error is returned.
 * - You can pass a `props` query parameter to return only the properties you want (separated by commas).
 */
export const get: APIHandler<void, Artifact> = async ({ params, locals, query }) => {
  const db = await getDatabase(Artifact);
  const id = params.artifact;
  const find = await db.findOne({ id });

  const artifact = find && Artifact.fromJSON(find);

  if (
    // Send 404 if the artifact does not exist
    !artifact ||
    // Send 404 if the artifact is private and the user does not have the `VIEW_ARTIFACTS` permission
    ((artifact.visibility === ArtifactVisibility.PRIVATE ||
      artifact.visibility === ArtifactVisibility.DRAFT) &&
      !(await locals.session.refreshAndCheckPermission(Permission.VIEW_ARTIFACTS)))
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
export const post: APIHandler<Artifact, GenericSuccess> = async ({ body, locals, params }) => {
  const db = await getDatabase(Artifact);
  const artifact = Artifact.fromJSON(body);

  if (!(await locals.session.refreshAndCheckPermission(Permission.EDIT_ARTIFACTS))) {
    return {
      status: 403,
      body: { error: 'You do not have permission to create artifacts' },
    };
  }

  if (artifact.id !== params.artifact) {
    return {
      status: 400,
      body: { error: 'Artifact id does not match the path' },
    };
  }

  artifact.visibility = ArtifactVisibility.DRAFT;

  await db.insertOne(artifact.toJSON());

  return {
    status: 201,
    body: { success: true },
  };
};

/**
 * Deletes an artifact by it's id.
 *
 * - Requires a user to be logged in.
 * - If the user does not have the `DELETE_ARTIFACTS` permission, a 403 Error is returned.
 * - If the artifact does not exist, a 404 Error is returned.
 */
export const del: APIHandler<void, GenericSuccess> = async ({ locals, params }) => {
  if (!(await locals.session.refreshAndCheckPermission(Permission.EDIT_ARTIFACTS))) {
    return {
      status: 403,
      body: { error: 'You do not have permission to delete artifacts' },
    };
  }

  const db = await getDatabase(Artifact);
  const id = params.artifact;
  const find = await db.findOne({ id });

  if (!find) {
    return {
      status: 404,
      body: { error: 'Artifact not found' },
    };
  }

  await db.deleteOne({ id });

  return {
    status: 200,
    body: { success: true },
  };
};

/**
 * Updates an artifact by it's id.
 *
 * - Requires a user to be logged in.
 * - If the user does not have the `EDIT_ARTIFACTS` permission, a 403 Error is returned.
 * - If the artifact does not exist, a 404 Error is returned.
 */
export const put: APIHandler<Artifact, GenericSuccess> = async ({ body, locals, params }) => {
  if (!(await locals.session.refreshAndCheckPermission(Permission.EDIT_ARTIFACTS))) {
    return {
      status: 403,
      body: { error: 'You do not have permission to edit artifacts' },
    };
  }

  const db = await getDatabase(Artifact);
  const id = params.artifact;
  const find = await db.findOne({ id });

  if (!find) {
    return {
      status: 404,
      body: { error: 'Artifact not found' },
    };
  }

  const artifact = Artifact.fromJSON(body);

  await db.findOneAndReplace({ id }, artifact.toJSON());

  return {
    status: 200,
    body: { success: true },
  };
};

/**
 * Updates an artifact by it's id. This accepts a partial update.
 *
 * - Requires a user to be logged in.
 * - If the user does not have the `EDIT_ARTIFACTS` permission, a 403 Error is returned.
 * - If the artifact does not exist, a 404 Error is returned.
 */
export const patch: APIHandler<Artifact, GenericSuccess> = async ({ body, locals, params }) => {
  if (!(await locals.session.refreshAndCheckPermission(Permission.EDIT_ARTIFACTS))) {
    return {
      status: 403,
      body: { error: 'You do not have permission to edit artifacts' },
    };
  }

  const db = await getDatabase(Artifact);
  const id = params.artifact;
  const find = await db.findOne({ id });

  if (!find) {
    return {
      status: 404,
      body: { error: 'Artifact not found' },
    };
  }

  const artifact = Artifact.fromJSON({ ...find, ...body });

  await db.findOneAndUpdate({ id }, artifact.toJSON());

  return {
    status: 200,
    body: { success: true },
  };
};
