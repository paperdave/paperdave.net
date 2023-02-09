import { browser } from '$app/environment';
import { writable } from 'svelte/store';

/** basic local storage sync store */
export function persistent<T>(
  key: string,
  initialValue: T,
  storage = browser ? localStorage : null!
) {
  if (!browser) {
    return writable(initialValue);
  }

  const json = storage.getItem(key);
  const value = json ? JSON.parse(json) : initialValue;

  const store = writable(value);

  store.subscribe((v) => {
    storage.setItem(key, JSON.stringify(v));
  });

  return store;
}

export const qaNotifyEmail = persistent('qa.notifyEmail', '');
