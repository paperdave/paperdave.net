import { MONGODB_DB } from '$lib/env';
import { JSONData } from '$lib/structures';
import mongo from 'mongodb';

// export function initDb() {
//   new mongo.MongoClient(MONGODB_URI);
// }

let connection: mongo.MongoClient;

export async function getDB<T>(type: { new (): T }): Promise<mongo.Collection<JSONData<T>>> {
  if (!connection) {
    // todo await
  }
  const structureName = (type as any).structureName;
  if (!structureName) {
    throw new Error('Type is not tagged with @schema');
  }
  return connection.db(MONGODB_DB).collection(structureName);
}
