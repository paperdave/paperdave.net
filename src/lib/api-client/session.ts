import { browser } from '$app/env';
import { ClientUser, User } from '$lib/structures';
import { localStorage as local, persist } from '@macfja/svelte-persistent-store';
import { get, writable } from 'svelte/store';

export const token = persist(writable<string | null>(null), local(true), 'Session.token');
export const expires = persist(writable<number | null>(null), local(true), 'Session.expires');

const initialUser = browser ? localStorage.getItem('Session.user') : null;

export const user = writable<ClientUser | null>(
  initialUser ? User.fromJSON(JSON.parse(initialUser)) : null
);

if (browser) {
  let updating = true;

  window.addEventListener('storage', () => {
    const newUser = localStorage.getItem('Session.user');
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

  user.subscribe(saveUser);

  updating = false;
}

export function getToken() {
  return get(token);
}

export function getExpires() {
  return get(expires);
}

export function getUser() {
  return get(user);
}
