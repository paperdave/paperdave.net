import { browser } from '$app/env';
import { ClientUser, Token, User } from '$lib/structures';
import { get, writable } from 'svelte/store';

const initialUser = browser ? localStorage.getItem('Session.user') : null;
export const user = writable<ClientUser | null>(
  initialUser ? User.fromJSON(JSON.parse(initialUser)) : null
);

const initialToken = browser ? localStorage.getItem('Session.token') : null;
export const token = writable<Token | null>(
  initialToken ? Token.fromJSON(JSON.parse(initialToken)) : null
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
    if (newUser) {
      user.set(User.fromJSON(JSON.parse(newUser)));
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
