import { MONGODB_DB, MONGODB_URI } from '$lib/env';
import m from 'mongoose';

export async function databaseReady() {
  if (m.connection.readyState === 0 || m.connection.readyState === 3) {
    await m.connect(MONGODB_URI, {
      dbName: MONGODB_DB,
    });
  }
}

export * from './Artifact';
export * from './BrainPost';
export * from './LegacyRedirect';
export * from './Question';
export * from './QuestionRequest';
export * from './User';
export * from './VaultKey';
