import { writable } from 'svelte/store';

export let hasMovedLetter = writable(false);
export let topZIndex = writable(1000);
export let gearRotations = writable(0);
