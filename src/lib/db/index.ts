import { MONGODB_DB, MONGODB_URI } from '$lib/env';
import { JSONData } from '$lib/structures';
import { Collection, MongoClient, ObjectId } from 'mongodb';

let connection = new MongoClient(MONGODB_URI).connect();

export async function getDB<T>(type: {
  new (): T;
}): Promise<Collection<JSONData<T> & { _id: ObjectId }>> {
  let conn = await connection;
  const structureName = (type as any).structureName;
  if (!structureName) {
    throw new Error('Type is not tagged with @schema');
  }
  return conn.db(MONGODB_DB).collection(structureName);
}

export type WithoutDatabaseInternals<X> = X extends Record<string, any>
  ? Omit<X, '_id' | '_v'>
  : X extends Array<infer Y>
  ? WithoutDatabaseInternals<Y>[]
  : X;

export function stripDatabaseInternals<X>(x: X): WithoutDatabaseInternals<X> {
  if (Array.isArray(x)) {
    return x.map(stripDatabaseInternals) as any;
  } else if (typeof x === 'object' && x) {
    return Object.entries(x).reduce((acc, [key, value]) => {
      if (key === '_id' || key === '_v') {
        return acc;
      } else {
        return { ...acc, [key]: stripDatabaseInternals(value) };
      }
    }, {} as any);
  } else {
    return x as any;
  }
}
