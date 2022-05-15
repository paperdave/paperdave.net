import type { StructureJSON } from '$lib/api-client/api-shared';
import { getDatabase } from '$lib/db';
import type { WrappedCollection } from '$lib/db/WrappedCollection';
import { Artifact, ArtifactType, ArtifactVisibility } from '$lib/structures';
import { maybeArrayOrPromise, type MaybeArrayOrPromise } from '$lib/utils/maybe';
import type { Dict } from '@davecode/structures/dist/helper-types';
import type { RequestHandler } from '@sveltejs/kit';

interface Params extends Dict<string> {
  list: string;
}

interface ListFn {
  fetch(db: WrappedCollection<Artifact, Artifact>): MaybeArrayOrPromise<Artifact[]>;
  removeProperties: string[];
}

// The supported lists.
export const artifactListMap: Record<string, ListFn> = {
  new: {
    fetch: (db) =>
      db.find({
        tags: { $all: ['new'] },
      }),
    removeProperties: ['visibility'],
  },
  videos: {
    fetch: (db) =>
      Promise.all([
        db.find({ type: ArtifactType.VIDEO }),
        db.find({ type: ArtifactType.MUSIC_VIDEO }),
        db.find({ type: 'video' }),
      ]),
    removeProperties: ['visibility', 'music', 'video'],
  },
  music: {
    fetch: (db) =>
      Promise.all([
        db.find({ type: ArtifactType.MUSIC }),
        db.find({ type: ArtifactType.MUSIC_VIDEO }),
        db.find({ type: 'music' }),
        db.find({ id: 'mayday' }),
        db.find({ id: 'im-18-now' }),
      ]),
    // TODO: in the future, i would love to create a class like ArtifactPreview, then fetch the
    // detailed information when you click on a MusicCard. right now to avoid validation errors
    // we have to send ALL metadata including the `video` prop on music videos.
    removeProperties: ['visibility'],
  },
  all: {
    fetch: (db) => db.find({}),
    removeProperties: ['visibility'],
  },
};

/**
 * Get an artifact list by it's list id. Lists are hardcoded into the api code, so the api does not
 * support modifying these presets. The presets are intended to be used by the frontend to display
 * list pages, so some properties are ommitted automatically.
 */
export const get: RequestHandler<Params> = async ({ params }) => {
  const { list } = params;
  const listFn = artifactListMap[list];
  if (!listFn) {
    return {
      status: 404,
      body: {
        error: `List ${list} does not exist`,
      },
    };
  }

  const db = await getDatabase(Artifact);
  const artifacts = (await maybeArrayOrPromise(listFn.fetch(db))).flat();

  const sorted = artifacts
    .filter((x) => x.visibility === ArtifactVisibility.PUBLIC)
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .map((a) => a.toJSON() as StructureJSON)
    .map((a) => {
      for (const prop of listFn.removeProperties) {
        delete (a as any)[prop];
      }
      return a;
    });

  return {
    status: 200,
    body: sorted,
  };
};
