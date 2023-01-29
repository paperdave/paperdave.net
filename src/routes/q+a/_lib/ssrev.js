/* eslint-disable */
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
// @ts-ignore
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
// @ts-ignore
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== 'symbol' ? key + '' : key, value);
  return value;
};
/*! (c) Andrea Giammarchi - ISC */
var self = {};
try {
  self.EventTarget = new EventTarget().constructor;
} catch (EventTarget2) {
  (function (Object2, wm) {
    var create = Object2.create;
    var defineProperty = Object2.defineProperty;
    var proto = EventTarget3.prototype;
    // @ts-ignore
    define(proto, 'addEventListener', function (type, listener, options) {
      for (
        // @ts-ignore
        var secret = wm.get(this),
          listeners = secret[type] || (secret[type] = []),
          i = 0,
          length = listeners.length;
        i < length;
        i++
      ) {
        if (listeners[i].listener === listener) return;
      }
      // @ts-ignore
      listeners.push({ target: this, listener, options });
    });
    // @ts-ignore
    define(proto, 'dispatchEvent', function (event) {
      // @ts-ignore
      var secret = wm.get(this);
      var listeners = secret[event.type];
      if (listeners) {
        // @ts-ignore
        define(event, 'target', this);
        // @ts-ignore
        define(event, 'currentTarget', this);
        listeners.slice(0).some(dispatch, event);
        delete event.currentTarget;
        delete event.target;
      }
      return true;
    });
    // @ts-ignore
    define(proto, 'removeEventListener', function (type, listener) {
      for (
        // @ts-ignore
        var secret = wm.get(this),
          listeners = secret[type] || (secret[type] = []),
          i = 0,
          length = listeners.length;
        i < length;
        i++
      ) {
        if (listeners[i].listener === listener) {
          listeners.splice(i, 1);
          return;
        }
      }
    });
    self.EventTarget = EventTarget3;
    function EventTarget3() {
      // @ts-ignore
      wm.set(this, create(null));
    }
    // @ts-ignore
    function define(target, name, value) {
      defineProperty(target, name, {
        configurable: true,
        writable: true,
        value
      });
    }
    // @ts-ignore
    function dispatch(info) {
      var options = info.options;
      // @ts-ignore
      if (options && options.once) info.target.removeEventListener(this.type, info.listener);
      // @ts-ignore
      if (typeof info.listener === 'function') info.listener.call(info.target, this);
      // @ts-ignore
      else info.listener.handleEvent(this);
      // @ts-ignore
      return this._stopImmediatePropagationFlag;
    }
  })(Object, new WeakMap());
}
var EventTarget$1 = self.EventTarget;
const defaultCacheRemoveOptions = {
  broadcast: false
};
const defaultCacheClearOptions = {
  broadcast: false
};
class CacheItem {
  // @ts-ignore
  constructor({ data, expiresAt = null }) {
    __publicField(this, 'data');
    __publicField(this, 'expiresAt');
    this.data = data;
    this.expiresAt = expiresAt;
  }
  isResolving() {
    return this.data instanceof Promise;
  }
  hasExpired() {
    return this.expiresAt === null || this.expiresAt < new Date();
  }
  // @ts-ignore
  expiresIn(milliseconds) {
    this.expiresAt = new Date();
    this.expiresAt.setMilliseconds(this.expiresAt.getMilliseconds() + milliseconds);
    return this;
  }
}
class DefaultCache {
  constructor() {
    __publicField(this, 'elements', new Map());
    // @ts-ignore
    __publicField(this, 'event', new EventTarget$1());
  }
  // @ts-ignore
  resolve(key, value) {
    Promise.resolve(value.data).then((detail) => {
      if (detail === void 0 || detail === null) {
        return this.remove(key);
      }
      value.data = detail;
      this.broadcast(key, detail);
    });
  }
  // @ts-ignore
  get(key) {
    // @ts-ignore
    return this.elements.get(key);
  }
  // @ts-ignore
  set(key, value) {
    // @ts-ignore
    this.elements.set(key, value);
    this.resolve(key, value);
  }
  // @ts-ignore
  remove(key, options) {
    const { broadcast } = __spreadValues(__spreadValues({}, defaultCacheRemoveOptions), options);
    if (broadcast) this.broadcast(key, void 0);
    // @ts-ignore
    this.elements.delete(key);
  }
  // @ts-ignore
  clear(options) {
    const { broadcast } = __spreadValues(__spreadValues({}, defaultCacheClearOptions), options);
    // @ts-ignore
    if (broadcast) for (const key of this.elements.keys()) this.broadcast(key, void 0);
    // @ts-ignore
    this.elements.clear();
  }
  // @ts-ignore
  has(key) {
    // @ts-ignore
    return this.elements.has(key);
  }
  // @ts-ignore
  subscribe(key, callback) {
    // @ts-ignore
    this.event.addEventListener(key, callback);
  }
  // @ts-ignore
  unsubscribe(key, callback) {
    // @ts-ignore
    this.event.removeEventListener(key, callback);
  }
  // @ts-ignore
  broadcast(key, data) {
    // @ts-ignore
    this.event.dispatchEvent(new CustomEvent(key, { detail: { data } }));
  }
}
// @ts-ignore
const fetcher = (url) => {
  return fetch(url).then((res) => {
    if (!res.ok) throw Error('Not a 2XX response.');
    return res.json();
  });
};
const defaultOptions = {
  cache: new DefaultCache(),
  // @ts-ignore
  errors: new EventTarget$1(),
  fetcher,
  initialData: void 0,
  loadInitialCache: true,
  revalidateOnStart: true,
  dedupingInterval: 2e3,
  revalidateOnFocus: true,
  focusThrottleInterval: 5e3,
  revalidateOnReconnect: true
};
const defaultRevalidateOptions = __spreadProps(__spreadValues({}, defaultOptions), {
  force: false
});
const defaultMutateOptions = {
  revalidate: true,
  revalidateOptions: __spreadValues({}, defaultRevalidateOptions)
};
const defaultClearOptions = {
  broadcast: false
};
class SWR {
  // @ts-ignore
  constructor(options) {
    __publicField(this, 'options');
    this.options = __spreadValues(__spreadValues({}, defaultOptions), options);
  }
  get cache() {
    return this.options.cache;
  }
  get errors() {
    return this.options.errors;
  }
  // @ts-ignore
  requestData(key, fetcher2) {
    return Promise.resolve(fetcher2(key)).catch((data) => {
      this.errors.dispatchEvent(new CustomEvent(key, { detail: { data } }));
      return void 0;
    });
  }
  // @ts-ignore
  resolveKey(key) {
    if (typeof key === 'function') {
      try {
        return key();
      } catch {
        return void 0;
      }
    }
    return key;
  }
  // @ts-ignore
  clear(keys, options) {
    const ops = __spreadValues(__spreadValues({}, defaultClearOptions), options);
    if (keys === void 0 || keys === null) return this.cache.clear(ops);
    if (!Array.isArray(keys)) return this.cache.remove(keys, ops);
    for (const key of keys) this.cache.remove(key, ops);
  }
  // @ts-ignore
  revalidate(key, options) {
    if (!key) return;
    const { fetcher: defaultFetcher, dedupingInterval: defaultDedupingInterval } = this.options;
    const {
      force,
      fetcher: fetcher2,
      dedupingInterval
    } = __spreadValues(
      __spreadValues(__spreadValues({}, defaultRevalidateOptions), {
        fetcher: defaultFetcher,
        dedupingInterval: defaultDedupingInterval
      }),
      options
    );
    let data = void 0;
    if (
      force ||
      !this.cache.has(key) ||
      (this.cache.has(key) && this.cache.get(key).hasExpired())
    ) {
      // @ts-ignore
      data = this.requestData(key, fetcher2);
    }
    if (data !== void 0) {
      this.mutate(key, new CacheItem({ data }).expiresIn(dedupingInterval), {
        revalidate: false
      });
    }
  }
  // @ts-ignore
  mutate(key, value, options) {
    if (!key) return;
    const { revalidate: revalidateAfterMutation, revalidateOptions } = __spreadValues(
      __spreadValues({}, defaultMutateOptions),
      options
    );
    let data;
    if (typeof value === 'function') {
      let state = null;
      if (this.cache.has(key)) {
        const item = this.cache.get(key);
        if (!item.isResolving()) state = item.data;
      }
      data = value(state);
    } else {
      data = value;
    }
    this.cache.set(key, data instanceof CacheItem ? data : new CacheItem({ data }));
    if (revalidateAfterMutation) this.revalidate(key, revalidateOptions);
  }
  // @ts-ignore
  subscribe(key, onData) {
    if (key) {
      // @ts-ignore
      const handler = ({ detail }) => onData(detail.data);
      this.cache.subscribe(key, handler);
      return () => this.cache.unsubscribe(key, handler);
    }
    return () => void 0;
  }
  // @ts-ignore
  subscribeErrors(key, onError) {
    if (key) {
      // @ts-ignore
      const handler = ({ detail }) => onError(detail.data);
      this.errors.addEventListener(key, handler);
      return () => this.errors.removeEventListener(key, handler);
    }
    return () => void 0;
  }
  // @ts-ignore
  subscribeVisibility(handler, { throttleInterval = 5e3, enabled = true } = {}) {
    if (enabled && typeof window !== 'undefined') {
      // @ts-ignore
      let lastFocus = null;
      const rawHandler = () => {
        const now = Date.now();
        // @ts-ignore
        if (lastFocus === null || now - lastFocus > throttleInterval) {
          lastFocus = now;
          handler();
        }
      };
      window.addEventListener('focus', rawHandler);
      return () => window.removeEventListener('focus', rawHandler);
    }
    return () => void 0;
  }
  // @ts-ignore
  subscribeNetwork(handler, { enabled = true } = {}) {
    if (enabled && typeof window !== 'undefined') {
      window.addEventListener('online', handler);
      return () => window.removeEventListener('online', handler);
    }
    return () => void 0;
  }
  // @ts-ignore
  get(key) {
    if (key && this.cache.has(key)) {
      const item = this.cache.get(key);
      if (!item.isResolving()) return item.data;
    }
    return void 0;
  }
  // @ts-ignore
  getOrWait(key) {
    return new Promise((resolve, reject) => {
      // @ts-ignore
      const unsubscribe = this.subscribe(key, (data) => {
        unsubscribe();
        return resolve(data);
      });
      // @ts-ignore
      const unsubscribeErrors = this.subscribeErrors(key, (error) => {
        unsubscribeErrors();
        return reject(error);
      });
      const current = this.get(key);
      if (current) return resolve(current);
    });
  }
  // @ts-ignore
  use(key, onData, onError, options) {
    const {
      fetcher: fetcher2,
      initialData,
      loadInitialCache,
      revalidateOnStart,
      dedupingInterval,
      revalidateOnFocus,
      focusThrottleInterval,
      revalidateOnReconnect
    } = __spreadValues(__spreadValues({}, this.options), options);
    // @ts-ignore
    const mutateCurrent = (value, options2) => {
      return this.mutate(this.resolveKey(key), value, options2);
    };
    // @ts-ignore
    const revalidateCurrent = (options2) => {
      return this.revalidate(this.resolveKey(key), options2);
    };
    const revalidateCurrentWithOptions = () => {
      return revalidateCurrent({ fetcher: fetcher2, dedupingInterval });
    };
    if (revalidateOnStart) revalidateCurrentWithOptions();
    const unsubscribeData = this.subscribe(this.resolveKey(key), onData);
    const unsubscribeErrors = this.subscribeErrors(this.resolveKey(key), onError);
    const unsubscribeVisibility = this.subscribeVisibility(revalidateCurrentWithOptions, {
      throttleInterval: focusThrottleInterval,
      enabled: revalidateOnFocus
    });
    const unsubscribeNetwork = this.subscribeNetwork(revalidateCurrentWithOptions, {
      enabled: revalidateOnReconnect
    });
    const unsubscribe = () => {
      unsubscribeData();
      unsubscribeErrors();
      unsubscribeVisibility();
      unsubscribeNetwork();
    };
    if (initialData) {
      mutateCurrent(initialData, { revalidate: false });
    }
    if (loadInitialCache) {
      const cachedData = this.get(this.resolveKey(key));
      if (cachedData) onData(cachedData);
    }
    return { unsubscribe };
  }
}
export {
  CacheItem,
  DefaultCache,
  SWR,
  defaultCacheClearOptions,
  defaultCacheRemoveOptions,
  defaultClearOptions,
  defaultMutateOptions,
  defaultOptions,
  defaultRevalidateOptions
};
