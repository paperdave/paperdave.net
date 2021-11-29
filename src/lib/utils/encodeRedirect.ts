export function encodeRedirect(str: string) {
  return encodeURIComponent(str).replace(/%2F/g, '/').replace(/%252B/, '+');
}

export function decodeRedirect(str: string) {
  return decodeURIComponent(str);
}
