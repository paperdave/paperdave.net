import { Instance, Structure, types } from '@davecode/structures';
import { ArtifactVisibility } from './enums';
import { DavecodeImage } from './Image';
import { getBaseOrigin } from './url-helpers';

export enum ArtifactType {
  Unknown,
  Video,
  Music,
  App,
  Journal,
  Fragment,
  WordMagnet,
  Game,
  NerdGear,
  Story,
  Square,
  MusicVideo,
}

/**
 * Represents some published media on my website. "Artifact" as in "you're exploring a website of
 * old artifacts and you have to search and explore the vast sea of content."
 */
export const Artifact = new Structure('Artifact')
  .prop('id', types.String.mustMatch(/[a-z0-9-]/g))
  .prop('type', types.Integer, { default: ArtifactType.Unknown })
  .prop('title', types.String, { default: 'Untitled' })
  .prop('date', types.Date, { default: () => new Date() })
  .prop('visibility', ArtifactVisibility, {
    default: ArtifactVisibility.PRIVATE,
  })
  .prop('thumb', DavecodeImage.nullable)
  .prop('tags', types.SetOf(types.String).nullable, { default: () => new Set() })
  .method('getURL', function (origin = getBaseOrigin()) {
    return new URL('/' + this.id, origin);
  })
  .create({ abstract: true });

export const MediaFile = new Structure('MediaFile')
  .prop('url', types.String)
  .prop('type', types.String)
  .prop('duration', types.Number.nullable)
  .prop('width', types.Number.nullable)
  .prop('height', types.Number.nullable)
  .create();

export const MixinFile = new Structure().prop('file', types.String.nullable);

export const VideoArtifact = Artifact.extend('VideoArtifact')
  .prop('type', types.Integer.mustEqual(ArtifactType.Video))
  .prop('video', MediaFile)
  .prop('duration', types.Number.nullable)
  .prop('ttms', types.Number.nullable)
  .prop('source', types.String.nullable)
  .create();

export const MusicArtifact = Artifact.extend('MusicArtifact')
  .prop('type', types.Integer.mustEqual(ArtifactType.Music))
  .prop('music', MediaFile)
  .prop('duration', types.Number.nullable)
  .prop('sheetMusicUrl', types.String.nullable)
  .create();

/**
 * Square artifacts are square photos (instagram clone). These do not use the File mixin but rather
 * rely on the *thumbnail* property.
 */
export const SquareArtifact = Artifact.extend('SquareArtifact')
  .prop('type', types.Integer.mustEqual(ArtifactType.Square))
  .create();

export const JournalArtifact = Artifact.extend('JournalArtifact')
  .prop('type', types.Integer.mustEqual(ArtifactType.Journal))
  .prop('file', MediaFile)
  .prop('duration', types.Number.nullable)
  .prop('editDate', types.Date.nullable)
  .create();

export const FragmentArtifact = Artifact.extend('FragmentArtifact')
  .prop('type', types.Integer.mustEqual(ArtifactType.Fragment))
  .prop('file', MediaFile)
  .prop('for', types.String.nullable)
  .create();

export const StoryArtifact = Artifact.extend('StoryArtifact')
  .prop('type', types.Integer.mustEqual(ArtifactType.Story))
  .create();

export const WordMagnetArtifact = Artifact.extend('WordMagnetArtifact')
  .prop('type', types.Integer.mustEqual(ArtifactType.WordMagnet))
  .create();

const MixinSoftware = new Structure()
  .prop('description', types.String.nullable)
  .prop('version', types.String.nullable);

export const AppArtifact = Artifact.extend('AppArtifact')
  .prop('type', types.Integer.mustEqual(ArtifactType.App))
  .mixin(MixinSoftware)
  .create();

export const NerdGearArtifact = Artifact.extend('NerdGearArtifact')
  .prop('type', types.Integer.mustEqual(ArtifactType.NerdGear))
  .mixin(MixinSoftware)
  .create();

export const GameArtifact = Artifact.extend('GameArtifact')
  .prop('type', types.Integer.mustEqual(ArtifactType.Game))
  .mixin(MixinSoftware)
  .create();

export const MusicVideoArtifact = Artifact.extend('MusicVideoArtifact')
  .prop('type', types.Integer.mustEqual(ArtifactType.MusicVideo))
  .mixin(MusicArtifact)
  .mixin(VideoArtifact)
  .method('toVideoArtifact', function () {
    return new VideoArtifact({
      ...this,
      // this is a bug with structure
      type: ArtifactType.Video as never,
    });
  })
  .method('toMusicArtifact', function () {
    return new MusicArtifact({
      ...this,
      // this is a bug with structure
      type: ArtifactType.Video as never,
    });
  })
  .create();

export type Artifact = Instance<typeof Artifact>;
export type VideoArtifact = Instance<typeof VideoArtifact>;
export type MusicArtifact = Instance<typeof MusicArtifact>;
export type SquareArtifact = Instance<typeof SquareArtifact>;
export type JournalArtifact = Instance<typeof JournalArtifact>;
export type FragmentArtifact = Instance<typeof FragmentArtifact>;
export type StoryArtifact = Instance<typeof StoryArtifact>;
export type WordMagnetArtifact = Instance<typeof WordMagnetArtifact>;
export type AppArtifact = Instance<typeof AppArtifact>;
export type NerdGearArtifact = Instance<typeof NerdGearArtifact>;
export type GameArtifact = Instance<typeof GameArtifact>;
export type MusicVideoArtifact = Instance<typeof MusicVideoArtifact>;
