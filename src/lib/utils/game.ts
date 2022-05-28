import type { Game } from '@prisma/client';

export interface GameDownload {
  platform: 'windows' | 'linux';
  url: string;
}

export function getTypedGameDownloads(game: Game) {
  return game.downloads as unknown[] as GameDownload[];
}
