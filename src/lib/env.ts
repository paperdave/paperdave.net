function envNonEmptyString(name: string, value: string) {
  if (!value) {
    throw new Error(`${name} environment variable is required`);
  }
  return value;
}

export const DATABASE_URL = envNonEmptyString('DATABASE_URL', (process.env as any).DATABASE_URL);
export const PROXYCHECK_API_KEY = (process.env as any).PROXYCHECK_API_KEY;
export const are_we_on_localhost_so_idont_have_to_check_auth = (process.env as any).ALLOW_STUFF === 'true';