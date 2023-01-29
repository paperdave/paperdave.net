export function assertAuthorized() {
  if (!import.meta.env.DEV) {
    throw new Error('Not authorized');
  }
}
