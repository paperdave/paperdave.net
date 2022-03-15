export function getBaseOrigin() {
  return typeof location !== 'undefined' ? location.origin : 'https://davecode.net';
}
