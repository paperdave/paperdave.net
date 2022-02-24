import 'dotenv/config';

function envNonEmptyString(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} environment variable is required`);
  }
  return value;
}

function envStringArray(name: string) {
  const value = process.env[name];
  if (!value) {
    return [];
  } else {
    return value.split(',').map((s) => s.trim());
  }
}

export const MONGODB_URI = envNonEmptyString('MONGODB_URI');
export const MONGODB_DB = envNonEmptyString('MONGODB_DB');
export const QA_BLOCKED_IPS = envStringArray('QA_BLOCKED_IPS');
