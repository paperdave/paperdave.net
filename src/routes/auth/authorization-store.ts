import { writable } from 'svelte/store';

export let authEmail = writable('dave@davecode.net');
export let authPassword = writable('');

export function resetAuthStores() {
  authEmail.set('dave@davecode.net');
  authPassword.set('');
}
