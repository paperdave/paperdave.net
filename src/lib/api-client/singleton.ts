import { DavecodeAPI } from './DavecodeAPI';

export const API = new DavecodeAPI(`/api/v1`);

export function wrapAPI(f: typeof fetch) {
  return API.with(f);
}
