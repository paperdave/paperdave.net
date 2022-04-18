import { browser } from '$app/env';
import { ClientUser, Token, User } from '$lib/structures';
import { get, writable } from 'svelte/store';

function tryOr<T>(fn: () => T, fallback: T) {
  try {
    return fn();
  } catch (e) {
    return fallback;
  }
}

const initialUser = browser ? localStorage.getItem('Session.user') : null;
export const user = writable<ClientUser | null>(
  tryOr(() => (initialUser ? ClientUser.fromJSON(JSON.parse(initialUser)) : null), null)
);

const initialToken = browser ? localStorage.getItem('Session.token') : null;
export const token = writable<Token | null>(
  tryOr(() => (initialToken ? Token.fromJSON(JSON.parse(initialToken)) : null), null)
);

if (browser) {
  let updating = true;

  window.addEventListener('storage', () => {
    if (updating) {
      return;
    }

    const newUser = localStorage.getItem('Session.user');
    if (newUser) {
      user.set(User.fromJSON(JSON.parse(newUser)));
    }

    const newToken = localStorage.getItem('Session.token');
    if (newToken) {
      token.set(Token.fromJSON(JSON.parse(newToken)));
    }
  });

  function saveUser(newUser: ClientUser | null) {
    if (!updating) {
      updating = true;
      localStorage.setItem('Session.user', JSON.stringify(newUser));
      updating = false;
    }
  }

  function saveToken(newToken: Token | null) {
    if (!updating) {
      updating = true;
      localStorage.setItem('Session.token', JSON.stringify(newToken));
      updating = false;
    }
  }

  user.subscribe(saveUser);
  token.subscribe(saveToken);

  updating = false;
}

export function getToken() {
  return get(token);
}

export function getUser() {
  return get(user);
}
