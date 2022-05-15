import type { StructureJSON } from '$lib/api-client/api-shared';
import { getDatabase } from '$lib/db';
import { Artifact, ArtifactVisibility, Permission } from '$lib/structures';
import type { Dict } from '@davecode/structures/dist/helper-types';
import type { RequestHandler } from '@sveltejs/kit';

interface Params extends Dict<string> {
  artifact: string;
}

type GetArtifactOutput = StructureJSON | { error: string };

/**
 * Retrives an artifact by it's id
 *
 * - Private or draft artifacts will be invisible to the public, but returned if the user has the
 *   `VIEW_ARTIFACTS` permission.
 * - If it does not exist, a 404 Error is returned.
 * - You can pass a `props` query parameter to return only the properties you want (separated by commas).
 */
export const get: RequestHandler<Params, GetArtifactOutput> = async ({ params, locals }) => {
  const id = params.artifact;

  const db = await getDatabase(Artifact);
  const artifact = await db.findOne({ id });

  if (
    // Send 404 if the artifact does not exist
    !artifact ||
    // Send 404 if the artifact is private and the user does not have the `VIEW_ARTIFACTS` permission
    ((artifact.visibility === ArtifactVisibility.PRIVATE ||
      artifact.visibility === ArtifactVisibility.DRAFT) &&
      !(await locals.user.queryPermission(Permission.VIEW_ARTIFACTS)))
  ) {
    return {
      status: 404,
      body: { error: 'Artifact not found' },
    };
  }

  return {
    status: 200,
    body: artifact.toJSON(),
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
export const post: RequestHandler<Params> = async ({ locals, params, request }) => {
  const db = await getDatabase(Artifact);
  const artifact = Artifact.fromJSON(await request.json());

  if (!(await locals.user.queryPermission(Permission.EDIT_ARTIFACTS))) {
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

  await db.insertOne(artifact);

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
export const del: RequestHandler<Params> = async ({ locals, params }) => {
  if (!(await locals.user.queryPermission(Permission.EDIT_ARTIFACTS))) {
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
export const put: RequestHandler<Params> = async ({ locals, params, request }) => {
  if (!(await locals.user.queryPermission(Permission.EDIT_ARTIFACTS))) {
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

  const artifact = Artifact.fromJSON(await request.json());
  await db.findOneAndReplace({ id }, artifact);

  return {
    status: 200,
    body: { success: true },
  };
};
