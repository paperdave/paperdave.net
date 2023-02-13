/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  getCdnSongLyricsURL,
  getCdnSongStreamURLs,
  getCdnSongDownloadURL,
  getCdnSongMetaURL,
  type CDNSongMeta
} from 'src/cdn';
import { emitStore, rw } from 'src/store';

const songs = new Map<string, SongEntry>();

let currentSong: SongEntry | null = null;
const queue: SongEntry[] = [];
const state = rw<'playing' | 'paused' | 'stopped'>('stopped');
const [onCurrentSongChange, currentSongStore] = emitStore(() => currentSong);
const [onQueueChange, queueStore] = emitStore(() => queue);

export const musicPlayerState = state;
export const musicPlayerCurrentSong = currentSongStore;
export const musicPlayerQueue = queueStore;

interface SongEntry {
  key: string;
  /** Required to get download URL */
  title?: string;
  /** Lyrics aren't required to be loaded */
  lyrics?: string;
  /** Audio Element */
  audioElement: HTMLAudioElement;
}

export function loadSong(key: string, title?: string): SongEntry {
  if (songs.has(key)) {
    return songs.get(key)!;
  }

  const audioElement = new Audio();
  console.log(audioElement);
  const songEntry: SongEntry = {
    key,
    title,
    audioElement
  };
  songs.set(key, songEntry);

  const sources = getCdnSongStreamURLs(key);
  for (const { type, url } of sources) {
    const sourceElement = document.createElement('source');
    sourceElement.src = url;
    sourceElement.type = type;
    audioElement.appendChild(sourceElement);
  }

  audioElement.addEventListener('ended', onEnded);

  return songEntry;
}

/** Load the lyrics */
export async function fetchSongLyrics(key: string): Promise<string> {
  const songEntry = await loadSong(key);
  if (songEntry.lyrics) {
    return songEntry.lyrics;
  }

  const lyrics = await fetch(getCdnSongLyricsURL(key)).then((res) => res.text());
  songEntry.lyrics = lyrics;
  return lyrics;
}

export function playSongEntry(songEntry: SongEntry) {
  if (currentSong) {
    currentSong.audioElement.pause();
  }

  currentSong = songEntry;
  onCurrentSongChange();
  currentSong.audioElement.currentTime = 0;
  currentSong.audioElement.play();
  state.value = 'playing';
}

export function playKey(key: string, title?: string) {
  let songEntry = songs.get(key);
  if (!songEntry) {
    songEntry = loadSong(key, title);
  }
  playSongEntry(songs.get(key)!);
}

export function pausePlayer() {
  if (state === 'playing') {
    currentSong!.audioElement.pause();
    state.value = 'paused';
  } else if (state === 'paused') {
    currentSong!.audioElement.play();
    state.value = 'playing';
  }
}

export function stopPlayer() {
  if (state !== 'stopped') {
    currentSong!.audioElement.pause();
    currentSong!.audioElement.currentTime = 0;
    state.value = 'stopped';
    queue.splice(0, queue.length);
    currentSong = null;
    onCurrentSongChange();
    onQueueChange();
  }
}

function onEnded() {
  if (queue.length) {
    playSongEntry(queue.shift()!);
  } else {
    stopPlayer();
  }
}

export async function getDownloadURL(
  keyOrSongEntry: string | SongEntry,
  format: 'flac' | 'mp3'
): Promise<string> {
  const key = typeof keyOrSongEntry === 'string' ? keyOrSongEntry : keyOrSongEntry.key;
  const entry = songs.get(key);
  if (entry && entry.title) {
    return getCdnSongDownloadURL(entry.key, entry.title, format);
  } else {
    const title = await fetch(getCdnSongMetaURL(key))
      .then((res) => res.json())
      .then((json: CDNSongMeta) => json.title);
    if (entry) {
      entry.title = title;
    }
    return getCdnSongDownloadURL(key, title, format);
  }
}

export function queueSongEntry(songEntry: SongEntry) {
  queue.push(songEntry);
  onQueueChange();
}
