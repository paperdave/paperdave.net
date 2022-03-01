import { Artifact, ArtifactType, User } from '$lib/structures';

const afTypes = {
  video: ArtifactType.Video,
  music: ArtifactType.Music,
  app: ArtifactType.App,
  journal: ArtifactType.Journal,
  fragment: ArtifactType.Fragment,
  wordmagnet: ArtifactType.WordMagnet,
  game: ArtifactType.Game,
  nerdgear: ArtifactType.NerdGear,
  story: ArtifactType.Story,
  square: ArtifactType.Square,
  musicvideo: ArtifactType.MusicVideo,
};

export const migrateArtifact = (data: any): Artifact => {
  const payload: any = {
    id: data.id,
    title: data.title,
    tags: data.tags,
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

  if (data.type === ArtifactType.Video) {
    data.video = {
      url: data.file,
      type: 'video',
    };
  } else if (data.type === ArtifactType.Music) {
    data.music = {
      url: data.file,
      type: 'audio',
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
