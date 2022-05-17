function envNonEmptyString(name: string, value: string) {
  if (!value) {
    throw new Error(`${name} environment variable is required`);
  }
  return value;
}

function envStringArray(name: string, value: string) {
  if (!value) {
    return [];
  } else {
    return value.split(',').map((s) => s.trim());
  }
}

// export const QA_BLOCKED_IPS = envStringArray('QA_BLOCKED_IPS', (process.env as any).QA_BLOCKED_IPS);
// export const REALM_APPID = envNonEmptyString('REALM_APPID', (process.env as any).REALM_APPID);
// export const REALM_TOKEN = envNonEmptyString('REALM_TOKEN', (process.env as any).REALM_TOKEN);
// export const MONGO_DB = envNonEmptyString('MONGO_DB', (process.env as any).MONGO_DB);
export const DATABASE_URL = envNonEmptyString('DATABASE_URL', (process.env as any).DATABASE_URL);
