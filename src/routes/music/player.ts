/* eslint-disable @typescript-eslint/no-non-null-assertion */
/// <reference lib="dom" />
import {
  getCdnSongLyricsURL,
  getCdnSongStreamURLs,
  getCdnSongDownloadURL,
  getCdnSongMetaURL,
  type CDNSongMeta
} from 'src/cdn';
import { emitStore, rw } from 'src/store';
import type { PageData } from './$types';

const songs = new Map<string, SongEntry>();

let currentSong: SongEntry | null = null;
let queue: SongEntry[] = [];
const songHistory: SongEntry[] = [];
// let queueUnshuffled: SongEntry[] = [];

const state = rw<'playing' | 'paused' | 'stopped'>('stopped');
const [onCurrentSongChange, currentSongStore] = emitStore(() => currentSong);
const [onQueueChange, queueStore] = emitStore(() => queue);

export const musicPlayerState = state;
export const musicPlayerCurrentSong = currentSongStore;
export const musicPlayerQueue = queueStore;
export const musicPlayerCurrentTime = rw(0);
export const musicPlayerShuffleMode = rw<boolean>(false);
export const musicPlayerLoopMode = rw<'off' | 'playlist' | 'song'>('off');

let playlist: PageData['albums'][number]['items'] = [];

export function setPlaylist(newPlaylist: PageData['albums'][number]['items']) {
  playlist = newPlaylist;
}

interface SongEntry {
  key: string;
  /** Lyrics aren't required to be loaded */
  lyrics?: string;
  /** Audio Element */
  audioElement: HTMLAudioElement;
  /** Data */
  data: (typeof playlist)[number]['songs'][number];
}

export function loadSong(key: string): SongEntry {
  if (songs.has(key)) {
    return songs.get(key)!;
  }

  const audioElement = new Audio();
  const songEntry: SongEntry = {
    key,
    audioElement,
    data: playlist.flatMap((x) => x.songs).find((x) => x.media === key)!
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
  audioElement.addEventListener('timeupdate', () => {
    if (key === currentSong?.key) {
      musicPlayerCurrentTime.value = audioElement.currentTime;
    }
  });

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

export async function playSongEntry(songEntry: SongEntry) {
  if (currentSong) {
    songHistory.push(currentSong);
    currentSong.audioElement.pause();
  }

  currentSong = songEntry;
  onCurrentSongChange();
  musicPlayerCurrentTime.value = 0;
  currentSong.audioElement.currentTime = 0;
  await currentSong.audioElement.load();
  await currentSong.audioElement.play();
  state.value = 'playing';
}

export function playKey(key: string) {
  let songEntry = songs.get(key);
  if (!songEntry) {
    songEntry = loadSong(key);
  }
  playSongEntry(songs.get(key)!);
}

export function playerPause() {
  if (state.value === 'playing') {
    currentSong!.audioElement.pause();
    state.value = 'paused';
  } else if (state.value === 'paused') {
    currentSong!.audioElement.play();
    state.value = 'playing';
  }
}

export function playerStop() {
  if (state.value !== 'stopped') {
    currentSong!.audioElement.pause();
    currentSong!.audioElement.currentTime = 0;
    state.value = 'stopped';
    queue.splice(0, queue.length);
    currentSong = null;
    onCurrentSongChange();
    onQueueChange();
  }
}

export function playerNext() {
  onEnded();
}

export function playerPrev() {
  if (musicPlayerCurrentTime.value < 2 && songHistory.length > 0) {
    if (currentSong) {
      queue.unshift(currentSong);
      currentSong.audioElement.pause();
      currentSong = null;
    }
    playSongEntry(songHistory.pop()!);
    onQueueChange();
  } else if (currentSong) {
    currentSong.audioElement.currentTime = 0;
    currentSong.audioElement.play();
  }
}

function onEnded() {
  if (queue.length) {
    playSongEntry(queue.shift()!);
  } else {
    playerStop();
  }
}

export async function getDownloadURL(
  keyOrSongEntry: string | SongEntry,
  format: 'flac' | 'mp3'
): Promise<string> {
  const key = typeof keyOrSongEntry === 'string' ? keyOrSongEntry : keyOrSongEntry.key;
  const entry = songs.get(key);
  if (entry && entry.data.title) {
    return getCdnSongDownloadURL(entry.key, entry.data.title, format);
  } else {
    const title = await fetch(getCdnSongMetaURL(key))
      .then((res) => res.json())
      .then((json: CDNSongMeta) => json.title);
    return getCdnSongDownloadURL(key, title, format);
  }
}

export function queueSongEntry(songEntry: SongEntry) {
  queue.push(songEntry);
  onQueueChange();
}

export function playAll() {
  queue = [];
  let isFirst = true;
  for (const album of playlist) {
    for (const song of album.songs) {
      (isFirst ? playSongEntry : queueSongEntry)(loadSong(song.media!));
      isFirst = false;
    }
  }
  onQueueChange();
}

export function replacePlaylistWithKeys(keys: string[]) {
  queue = [];
  let isFirst = true;
  for (const key of keys) {
    (isFirst ? playSongEntry : queueSongEntry)(loadSong(key));
    isFirst = false;
  }
  onQueueChange();
}
