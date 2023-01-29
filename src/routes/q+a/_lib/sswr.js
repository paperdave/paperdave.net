/* eslint-disable */
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
// @ts-ignore
var __defNormalProp = (obj, key, value) =>
  key in obj
    ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value })
    : (obj[key] = value);
// @ts-ignore
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {})) if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    // @ts-ignore
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
import { SWR } from './ssrev';
import { onMount, onDestroy } from 'svelte';
function noop() {}
// @ts-ignore
function run(fn) {
  return fn();
}
// @ts-ignore
function run_all(fns) {
  fns.forEach(run);
}
// @ts-ignore
function is_function(thing) {
  return typeof thing === 'function';
}
// @ts-ignore
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === 'object') || typeof a === 'function';
}
// @ts-ignore
function subscribe$1(store, ...callbacks) {
  if (store == null) {
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
// @ts-ignore
const subscriber_queue = [];
// @ts-ignore
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
// @ts-ignore
function writable(value, start = noop) {
  // @ts-ignore
  let stop;
  const subscribers = new Set();
  // @ts-ignore
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      // @ts-ignore
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            // @ts-ignore
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  // @ts-ignore
  function update(fn) {
    set(fn(value));
  }
  // @ts-ignore
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      // @ts-ignore
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        // @ts-ignore
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
// @ts-ignore
function derived(stores, fn, initial_value) {
  const single = !Array.isArray(stores);
  const stores_array = single ? [stores] : stores;
  const auto = fn.length < 2;
  // @ts-ignore
  return readable(initial_value, (set) => {
    let inited = false;
    // @ts-ignore
    const values = [];
    let pending = 0;
    let cleanup = noop;
    const sync = () => {
      if (pending) {
        return;
      }
      cleanup();
      // @ts-ignore
      const result = fn(single ? values[0] : values, set);
      if (auto) {
        set(result);
      } else {
        cleanup = is_function(result) ? result : noop;
      }
    };
    const unsubscribers = stores_array.map((store, i) =>
      subscribe$1(
        store,
        // @ts-ignore
        (value) => {
          values[i] = value;
          pending &= ~(1 << i);
          if (inited) {
            sync();
          }
        },
        () => {
          pending |= 1 << i;
        }
      )
    );
    inited = true;
    sync();
    return function stop() {
      run_all(unsubscribers);
      cleanup();
    };
  });
}
class SSWR extends SWR {
  // @ts-ignore
  useSWR(key, options) {
    let unsubscribe = void 0;
    // @ts-ignore
    const data = writable(void 0, () => () => unsubscribe == null ? void 0 : unsubscribe());
    // @ts-ignore
    const error = writable(void 0, () => () => unsubscribe == null ? void 0 : unsubscribe());
    onMount(() => {
      // @ts-ignore
      const onData = (d) => {
        error.set(void 0);
        data.set(d);
      };
      // @ts-ignore
      const onError = (e) => error.set(e);
      // @ts-ignore
      unsubscribe = this.use(
        key,
        onData,
        onError,
        __spreadValues(
          {
            loadInitialCache: true
          },
          options
        )
      ).unsubscribe;
    });
    // @ts-ignore
    onDestroy(() => (unsubscribe == null ? void 0 : unsubscribe()));
    // @ts-ignore
    const mutate2 = (value, ops) => {
      return this.mutate(
        this.resolveKey(key),
        value,
        __spreadValues(
          {
            revalidateOptions: options
          },
          ops
        )
      );
    };
    // @ts-ignore
    const revalidate2 = (ops) => {
      return this.revalidate(
        this.resolveKey(key),
        __spreadValues(__spreadValues({}, options), ops)
      );
    };
    // @ts-ignore
    const clear2 = (ops) => {
      return this.clear(this.resolveKey(key), ops);
    };
    const isLoading = derived(
      [data, error],
      // @ts-ignore
      ([data2, error2]) => data2 === void 0 && error2 === void 0
    );
    const isValid = derived(
      [data, error],
      // @ts-ignore
      ([data2, error2]) => data2 !== void 0 && error2 === void 0
    );
    return {
      data,
      error,
      mutate: mutate2,
      revalidate: revalidate2,
      clear: clear2,
      isLoading,
      isValid
    };
  }
}
// @ts-ignore
const createSWR = (options) => new SSWR(options);
let swr = createSWR();
// @ts-ignore
const createDefaultSWR = (options) => {
  swr = createSWR(options);
  return swr;
};
// @ts-ignore
const subscribe = (key, onData) => {
  return swr.subscribe(key, onData);
};
// @ts-ignore
const subscribeErrors = (key, onError) => {
  return swr.subscribeErrors(key, onError);
};
// @ts-ignore
const get = (key) => {
  return swr.get(key);
};
// @ts-ignore
const getOrWait = (key) => {
  return swr.getOrWait(key);
};
// @ts-ignore
const use = (key, onData, onError, options) => {
  return swr.use(key, onData, onError, options);
};
// @ts-ignore
const useSWR = (key, options) => {
  return swr.useSWR(key, options);
};
// @ts-ignore
const mutate = (key, value, options) => {
  return swr.mutate(key, value, options);
};
// @ts-ignore
const revalidate = (key, options) => {
  return swr.revalidate(key, options);
};
// @ts-ignore
const clear = (keys, options) => {
  return swr.clear(keys, options);
};
export {
  SSWR,
  clear,
  createDefaultSWR,
  createSWR,
  get,
  getOrWait,
  mutate,
  revalidate,
  subscribe,
  subscribeErrors,
  swr,
  use,
  useSWR
};
