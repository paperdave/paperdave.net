import { MONGODB_DB, MONGODB_URI } from '$lib/env';
import { JSONData } from '$lib/structures';
import { Collection, MongoClient, ObjectId } from 'mongodb';

let connectionPromise: null | Promise<MongoClient> = null;
let client: MongoClient | null = null;

if (global._mongoDbClient) {
  client = global._mongoDbClient;
} else {
  connectionPromise = global._mongoDbConnectionPromise =
    global._mongoDbConnectionPromise ??
    new MongoClient(MONGODB_URI).connect().catch(() => {
      connectionPromise = global._mongoDbConnectionPromise = new MongoClient(MONGODB_URI).connect();
    });
}

export async function getDatabase<T>(type: {
  new (): T;
}): Promise<Collection<JSONData<T> & { _id: ObjectId }>> {
  if (connectionPromise) {
    client = global._mongoDbClient = await connectionPromise;
  }
  connectionPromise = null;
  const structureName = (type as any).structureName;
  if (!structureName) {
    throw new Error('Type is not tagged with @schema');
  }
  return client.db(MONGODB_DB).collection(structureName);
}

export type WithoutDatabaseInternals<X> = X extends Record<string, any>
  ? Omit<X, '_id' | '_v'>
  : X extends Array<infer Y>
  ? WithoutDatabaseInternals<Y>[]
  : X;

export function stripDatabaseInternals<X>(x: X): any {
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
