import { MONGODB_DB, MONGODB_URI } from '$lib/env';
import { connect, connection } from 'mongoose';

if (connection.readyState === 0 || connection.readyState === 3) {
  connect(MONGODB_URI, {
    dbName: MONGODB_DB,
  });
}

export * from './Artifact';
