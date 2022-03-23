import { getDatabase } from '$lib/db';
import { WrappedCollection } from '$lib/db/WrappedCollection';
import { Artifact, ArtifactVisibility } from '$lib/structures';
import { maybePromise, MaybePromise } from '$lib/utils/maybe';
import { Dict } from '@davecode/structures/dist/helper-types';
import { RequestHandler } from '@sveltejs/kit';

interface Params extends Dict<string> {
  list: string;
}

type ListFn = (db: WrappedCollection<Artifact>) => MaybePromise<Artifact[]>;

export const artifactListMap: Record<string, ListFn> = {
  videos: (db) => db.find({ type: 'VIDEO' }),
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
  const artifacts = (await maybePromise(listFn(db))).flat();

  const sorted = artifacts
    .filter((x) => x.visibility === ArtifactVisibility.PUBLIC)
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .map((a) => a.toJSON())
    .map((a) => {
      delete (a as any).visibility;
      delete (a as any).video;
      delete (a as any).music;
      return a;
    });

  return {
    status: 200,
    body: sorted,
  };
};
