import 'dotenv/config';

function envNonEmpty(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} environment variable is required`);
  }
  return value;
}

export const MONGODB_URI = envNonEmpty('MONGODB_URI');
export const MONGODB_DB = envNonEmpty('MONGODB_DB');
