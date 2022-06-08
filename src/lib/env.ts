function envNonEmptyString(name: string, value: string) {
  if (!value) {
    throw new Error(`${name} environment variable is required`);
  }
  return value;
}

export const DATABASE_URL = envNonEmptyString('DATABASE_URL', (process.env as any).DATABASE_URL);
export const PROXYCHECK_API_KEY = (process.env as any).PROXYCHECK_API_KEY;