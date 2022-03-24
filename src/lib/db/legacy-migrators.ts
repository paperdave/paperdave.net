import { Artifact, ArtifactType, MusicVideoArtifact, User } from '$lib/structures';
import { AudioMedia, ImageMedia, VideoMedia } from '$lib/structures/Media';

const afTypes = {
  video: ArtifactType.VIDEO,
  music: ArtifactType.MUSIC,
  app: ArtifactType.APP,
  journal: ArtifactType.JOURNAL,
  fragment: ArtifactType.FRAGMENT,
  wordmagnet: ArtifactType.WORD_MAGNET,
  game: ArtifactType.GAME,
  nerdgear: ArtifactType.NERD_GEAR,
  story: ArtifactType.STORY,
  square: ArtifactType.SQUARE,
  musicvideo: ArtifactType.MUSIC_VIDEO,
};

export const migrateArtifact = (data: any): Artifact => {
  if (data.id === 'mayday') {
    return new MusicVideoArtifact({
      id: 'mayday',
      type: ArtifactType.MUSIC_VIDEO,
      title: 'Mayday',
      tags: new Set(['music video']),
      visibility: 'PUBLIC',
      date: new Date(1645128900367),
      thumb: new ImageMedia({
        url: 'https://media.davecode.net/content/2022/mayday.jpeg',
        width: 1920,
        height: 1080,
        hash: 'LIK[ib00GX}u00^+IqrXF]xG$%Ee',
      }),
      video: new VideoMedia({
        url: 'https://media.davecode.net/content/2022/mayday.mp4',
        width: 1920,
        height: 1080,
        duration: 260,
      }),
      music: new AudioMedia({
        url: 'https://media.davecode.net/content/2022/mayday.mp3',
        duration: 227,
      }),
    });
  }

  const payload: any = {
    id: data.id,
    title: data.title,
    tags: data.tags ?? [],
    type: afTypes[data.type as keyof typeof afTypes],
    visibility: data.visibility,
    date: data.date,
  };

  if (data.thumbnail) {
    payload.thumb = {
      url: data.thumbnail,
      width: 100,
      height: 100,
      hash: data.blurhash,
    };
  }

  if (data.type === 'video') {
    payload.video = {
      url: data.data.file,
      width: 1920,
      height: 1080,
      duration: 0,
    };
  } else if (data.type === 'music') {
    payload.music = {
      url: data.data.file,
      duration: 0,
    };
  }

  return Artifact.fromJSON(payload);
};

export const mirgrateUser = (data: any): User => {
  const payload: any = {
    id: data.id,
    name: data.name,
    email: data.email,
    permissions: data.permissions,
    passwordHash: data.passwordHash,
    salt: data.salt,
  };

  if (data.avatar) {
    payload.avatar = {
      url: data.avatar,
      width: 256,
      height: 256,
    };
  }

  return User.fromJSON(payload);
};
