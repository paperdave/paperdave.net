import { Instance, types } from '@davecode/structures';

export const ArtifactType = types.Enum(
  'UNKNOWN',
  'VIDEO',
  'MUSIC',
  'APP',
  'JOURNAL',
  'FRAGMENT',
  'WORD_MAGNET',
  'GAME',
  'NERD_GEAR',
  'STORY',
  'SQUARE',
  'MUSIC_VIDEO'
);
export type ArtifactType = Instance<typeof ArtifactType>;

export const ArtifactVisibility = types.Enum('PUBLIC', 'PRIVATE', 'DRAFT', 'UNLISTED');
export type ArtifactVisibility = Instance<typeof ArtifactVisibility>;

export const SoftarePlatform = types.Enum(
  'LINUX',
  'MACOS',
  'WINDOWS',
  'WEB_URL',
  'ZIP',
  'JAVA',
  'ANDROID',
  'IOS',
  'SOURCE_GAMEMAKER',
  'SOURCE_ZIP'
);
export type SoftarePlatform = Instance<typeof SoftarePlatform>;

export const Permission = types.Enum(
  'DAVE',
  'RESPOND_TO_QUESTIONS',
  'VIEW_ARTIFACTS',
  'EDIT_ARTIFACTS',
  'MANAGE_NOW',
  'MANAGE_FEATURED',
  'MANAGE_VAULT'
);
export type Permission = Instance<typeof Permission>;