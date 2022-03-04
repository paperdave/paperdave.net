import { Instance, Structure, types } from '@davecode/structures';

const typeVideo = 'VIDEO';
const typeImage = 'IMAGE';
const typeAudio = 'AUDIO';

const extensionMap: Record<string, 'VIDEO' | 'IMAGE' | 'AUDIO'> = {
  mp4: typeVideo,
  webm: typeVideo,
  mp3: typeAudio,
  m4a: typeAudio,
  wav: typeAudio,
  png: typeImage,
  jpeg: typeImage,
  jpg: typeImage,
  gif: typeImage,
};

/**
 * Represents a photo, with a blurhash, and it's size. This lets me display images without layout
 * shift and give a nice blur loading. Not named Image due to a conflict with the Image type in the Web API.
 */
export const Media = new Structure('Media') //
  .prop('url', types.String)
  .method('getType', function () {
    return extensionMap[this.url.split('.').pop()!] || 'UNKNOWN';
  })
  .create({ abstract: true });
export type Media = Instance<typeof Media>;

export const ImageMedia = Media.extend('ImageMedia') //
  .prop('url', types.String)
  .prop('width', types.Number)
  .prop('height', types.Number)
  .prop('hash', types.String.nullable)
  .method('getAspect', function () {
    return this.width / this.height;
  })
  .create();
export type ImageMedia = Instance<typeof ImageMedia>;

export const VideoMedia = Media.extend('VideoMedia') //
  .prop('width', types.Number)
  .prop('height', types.Number)
  .prop('duration', types.Number)
  .method('getAspect', function () {
    return this.width / this.height;
  })
  .create();
export type VideoMedia = Instance<typeof VideoMedia>;

export const AudioMedia = Media.extend('AudioMedia') //
  .prop('duration', types.Number)
  .create();
export type AudioMedia = Instance<typeof AudioMedia>;
