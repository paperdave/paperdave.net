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
