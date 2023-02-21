import { browser } from '$app/environment';
import { writable, type Subscriber, type Writable } from 'svelte/store';

/**
 * my version of the writable svelte store, just has a helper .value property
 */
export function rw<T>(initialValue: T) {
  let value = initialValue;
  const store = writable(initialValue);
  store.subscribe((v) => (value = v));
  Object.defineProperty(store, 'value', {
    get: () => value,
    set: (v) => {
      store.set(v);
    }
  });
  return store as any as Writable<T> & { value: T };
}

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

export function emitStore<T>(getter: () => T): [onChange: () => void, store: SvelteStore<T>] {
  let listeners: Subscriber<T>[] = [];

  function subscribe(listener: Subscriber<T>) {
    listener(getter());
    listeners.push(listener);
    return () => void (listeners = listeners.filter((l) => l !== listener));
  }

  function onChange() {
    const value = getter();
    listeners.forEach((l) => l(value));
  }

  return [onChange, { subscribe }];
}
