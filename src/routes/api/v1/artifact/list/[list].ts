import { getDatabase } from '$lib/db';
import { Artifact, ArtifactVisibility, JSONData } from '$lib/structures';
import { APIHandler } from '$lib/utils/api';
import { MaybeArrayOrPromise, maybeArrayOrPromise } from '$lib/utils/maybe';
import { ObjectID } from 'bson';
import { Collection, FindCursor } from 'mongodb';

type ArtifactDocument = JSONData<Artifact> & { _id: ObjectID };
type ArtifactCursor = FindCursor<JSONData<Artifact>>;
type ListFn = (collection: Collection<ArtifactDocument>) => MaybeArrayOrPromise<ArtifactCursor>;

export const artifactListMap: Record<string, ListFn> = {
  videos: (db) =>
    db.find({ type: 'video' }).project({
      _v: 1,
      id: 1,
      type: 1,
      title: 1,
      thumbnail: 1,
      visibility: 1,
      date: 1,
    }),
  music: (db) =>
    db.find({ type: 'music' }).project({
      _v: 1,
      id: 1,
      type: 1,
      title: 1,
      visibility: 1,
      date: 1,
      data: 1,
    }),
};

/**
 * Get an artifact list by it's list id. Lists are hardcoded into the api code, so the api does not
 * support modifying these presets. The presets are intended to be used by the frontend to display
 * list pages, so some properties are ommitted automatically.
 */
export const get: APIHandler<void, JSONData<Artifact>[]> = async ({ params }) => {
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
  const cursors = await maybeArrayOrPromise(listFn(db));
  const artifacts = (await Promise.all(cursors.map((cursor) => cursor.toArray()))).flat();

  const sorted = artifacts
    .map((a) => Artifact.fromJSON(a))
    .filter((x) => x.visibility === ArtifactVisibility.PUBLIC)
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .map((a) => a.toJSON())
    .map((a) => {
      delete (a as any).visibility;
      return a;
    });

  return {
    status: 200,
    body: sorted,
  };
};
