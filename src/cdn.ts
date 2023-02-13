export const CDN = 'https://media.paperdave.net';

const imageFormats = ['webp', 'jpeg'] as const;
const imageTypes = {
  // album art for the music page and so on
  album: [3000, 1000, 512, 64],
  // "squares" aka my instagram clone
  square: [1920, 512, 256, 64]
} as const;
// videos hold their own thumbnails apart from the /img folder
const videoThumbnailSizes = [1920, 1280, 640, 400] as const;

// TYPES

export type CDNImageFormat = (typeof imageFormats)[number];
export type CDNImageType = keyof typeof imageTypes;

// VIDEOS

export interface CDNVideoFullMeta {
  title: string;
  key: string;
  files: [CDNVideoHLSFile, ...CDNVideoDownloadFile[]];
  encodeDate: string;
  encodeTime: number;
  resolution: {
    width: number;
    height: number;
    fps: number;
  };
  quality: '4k' | '1080p' | '720p';
  totalSize: number;
  webmDownload?: string;
  mp4Download?: string;
  originalDownload?: string;
  thumbnails?: CDNVideoThumbnail[];
  blurhash?: string;
  thumbnailEncodeTime?: number;
}

export interface CDNVideoMeta {
  key: string;
  title: string;
  thumb: boolean;
  q: '4k' | '1080p' | '720p';
  hls: string;
  webm: string;
  original?: string;
  bh?: string;
}

interface CDNVideoHLSFile {
  type: 'application/x-mpegURL';
  url: string;
  streams: CDNVideoHLSStream[];
  size: number;
  encodeTime?: number;
}

interface CDNVideoHLSStream {
  width: number;
  height: number;
  fps: number;
  size: number;
}

interface CDNVideoDownloadFile {
  type: 'video/webm' | 'video/mp4' | 'original';
  url: string;
  size: number;
  encodeTime?: number;
}

interface CDNVideoThumbnail {
  type: 'jpeg' | 'webp';
  width: number;
  url: string;
}

export const getCdnVideoMetaURL = (key: string) => `${CDN}/video/${key}/meta.json`;

export const getCdnVideoFullMetaURL = (key: string) => `${CDN}/video/${key}/index.json`;

export const getCdnVideoStreamURL = (key: string) => `${CDN}/video/${key}/hls.m3u8`;

export const getCdnVideoThumbnailURLs = (key: string) =>
  imageFormats
    .map((ext) =>
      videoThumbnailSizes.map((size) => ({
        url: `${CDN}/video/${key}/thumbnail/${size}w.${ext}`,
        size,
        type: `image/${ext}`
      }))
    )
    .flat();

export const getCdnVideoDownloadURL = (key: string, title: string) =>
  `${CDN}/video/${key}/${title}.webm`;

export const fetchCdnVideoMeta = async (key: string) => {
  const response = await fetch(getCdnVideoMetaURL(key));
  return response.json() as Promise<CDNVideoMeta>;
};

export const fetchCdnVideoFullMeta = async (key: string) => {
  const response = await fetch(getCdnVideoFullMetaURL(key));
  return response.json() as Promise<CDNVideoFullMeta>;
};

// SONGS

export interface CDNSongMeta {
  key: string;
  title: string;
  flac?: string | null;
  mp3?: string | null;
}

export interface CDNSongFullMeta {
  key: string;
  title: string;
  meta: {
    artist?: string;
    year?: number;
    track?: number;
    publisher?: string;
    copyright?: string;
  };
  formats: CDNSongFormatMeta[];
  totalSize: number;
  encodeTime: number;
  encodeDate: string;
}

export interface CDNSongFormatMeta {
  type: string;
  purpose: CDNSongFormatPurpose;
  url: string;
  size: number;
}

export type CDNSongFormatPurpose = 'stream' | 'download';
export type CDNAudioDownloadFormat = 'flac' | 'mp3';

export const getCdnSongMetaURL = (key: string) => `${CDN}/song/${key}/meta.json`;

export const getCdnSongFullMetaURL = (key: string) => `${CDN}/song/${key}/index.json`;

export const getCdnSongDownloadURL = //
  (key: string, title: string, format: CDNAudioDownloadFormat) =>
    `${CDN}/song/${key}/${title}.${format}`;

export const getCdnSongStreamURLs = (key: string) => [
  { url: `${CDN}/song/${key}/media.ogg`, type: 'audio/ogg' },
  { url: `${CDN}/song/${key}/media.aac`, type: 'audio/aac' }
];

export const getCdnSongLyricsURL = (key: string) => `${CDN}/song/${key}/lyrics.txt`;

// IMAGES

export interface CDNImageFullMeta {
  key: string;
  type: string;
  images: CDNImageEntry[];
  encodeDate: string;
  encodeTime: number;
  totalSize: number;
}

export interface CDNImageEntry {
  width: number;
  height: number;
  format: 'jpeg' | 'webp';
  size: number;
  url: string;
}

export interface CDNImageMeta {
  key: string;
  type: string;
  w: number;
  h: number;
}

export const getCdnImageFullMetaURL = (key: string, type: CDNImageType) =>
  `${CDN}/img/${type}/${key}/index.json`;

export const getCdnImageMetaURL = (key: string, type: CDNImageType) =>
  `${CDN}/img/${type}/${key}/meta.json`;

export const getCdnImageURLs = (key: string, type: CDNImageType, maxSize?: number) =>
  imageFormats
    .map((ext) =>
      imageTypes[type].map((size) => ({
        url: `${CDN}/img/${type}/${key}/${size}.${ext}`,
        size,
        type: `image/${ext}`
      }))
    )
    .flat()
    .filter((image) => !maxSize || image.size <= maxSize);

export const getCdnImageSrcSet = (key: string, type: CDNImageType, maxSize?: number) =>
  getCdnImageURLs(key, type, maxSize)
    .map((image) => `${image.url} ${image.size}w`)
    .join(', ');

// BITS

export const getCdnBitURL = (filename: string) => `${CDN}/bit/${filename}`;
