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

export const QA_BLOCKED_IPS = envStringArray('QA_BLOCKED_IPS');
export const REALM_APPID = envNonEmptyString('REALM_APPID');
export const REALM_TOKEN = envNonEmptyString('REALM_TOKEN');
export const MONGO_DB = envNonEmptyString('MONGO_DB');
