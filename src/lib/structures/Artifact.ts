import { Instance, Structure, types } from '@davecode/structures';
import { ArtifactType, ArtifactVisibility } from './enums';
import { AudioMedia, ImageMedia, Media, VideoMedia } from './Media';
import { getBaseOrigin } from './url-helpers';

/**
 * Represents some published media on my website. "Artifact" as in "you're exploring a website of
 * old artifacts and you have to search and explore the vast sea of content."
 */
export const Artifact = new Structure('Artifact')
  .prop('id', types.String)
  .prop('type', types.String, { default: ArtifactType.UNKNOWN })
  .prop('title', types.String, { default: 'Untitled' })
  .prop('date', types.Date, { default: () => new Date() })
  .prop('visibility', ArtifactVisibility, {
    default: ArtifactVisibility.PRIVATE,
  })
  .prop('thumb', ImageMedia.nullable)
  .prop('tags', types.SetOf(types.String), { default: () => new Set() })
  .method('getURL', function (origin = getBaseOrigin()) {
    return new URL('/' + this.id, origin);
  })
  .create({ abstract: true });

/** Video artifacts are videos listed on the main videos page. Music videos are a separate type. */
export const VideoArtifact = Artifact.extend('VideoArtifact')
  .prop('type', types.String.mustEqual(ArtifactType.VIDEO), { default: ArtifactType.VIDEO })
  .prop('video', VideoMedia)
  .prop('duration', types.Number.nullable)
  .prop('ttms', types.Number.nullable)
  .prop('source', types.String.nullable)
  .create();

/** Music artifacts are all of my songs and instrumentals. Music videos are a separate type. */
export const MusicArtifact = Artifact.extend('MusicArtifact')
  .prop('type', types.String.mustEqual(ArtifactType.MUSIC), { default: ArtifactType.MUSIC })
  .prop('music', AudioMedia)
  .prop('duration', types.Number.nullable)
  .prop('sheetMusicUrl', types.String.nullable)
  .create();

/**
 * Square artifacts are square photos (instagram clone). The image is stored in the
 * Artifact.thumbnail property.
 */
export const SquareArtifact = Artifact.extend('SquareArtifact')
  .prop('type', types.String.mustEqual(ArtifactType.SQUARE), { default: ArtifactType.SQUARE })
  .create();

/** Doodle artifacts are digitally drawn photos. The image is stored in the Artifact.thumbnail property. */
export const DoodleArtifact = Artifact.extend('DoodleArtifact')
  .prop('type', types.String.mustEqual(ArtifactType.DOODLE), { default: ArtifactType.SQUARE })
  .create();

/** Journal Artifacts are audio and video */
export const JournalArtifact = Artifact.extend('JournalArtifact')
  .prop('type', types.String.mustEqual(ArtifactType.JOURNAL), { default: ArtifactType.JOURNAL })
  .prop('file', Media)
  .prop('duration', types.Number.nullable)
  .prop('editDate', types.Date.nullable)
  .create();

/**
 * Fragment artifacts are uploaded bits of a project, and may be released before the associated
 * project is done.
 */
export const FragmentArtifact = Artifact.extend('FragmentArtifact')
  .prop('type', types.String.mustEqual(ArtifactType.FRAGMENT), { default: ArtifactType.FRAGMENT })
  .prop('file', Media)
  .prop('for', types.String.nullable)
  .create();

/** Story artifacts are written media that can be read. TODO: how this works. */
export const StoryArtifact = Artifact.extend('StoryArtifact')
  .prop('type', types.String.mustEqual(ArtifactType.STORY), { default: ArtifactType.STORY })
  .create();

/** Word Magnet artifacts are pictures of word magnets. The image is stored in the Artifact.thumbnail property. */
export const WordMagnetArtifact = Artifact.extend('WordMagnetArtifact')
  .prop('type', types.String.mustEqual(ArtifactType.WORD_MAGNET), {
    default: ArtifactType.WORD_MAGNET,
  })
  .create();

const MixinSoftware = new Structure()
  .prop('description', types.String.nullable)
  .prop('version', types.String.nullable);

/** Apps are software that are not "games," aka non-entertainment software. */
export const AppArtifact = Artifact.extend('AppArtifact')
  .prop('type', types.String.mustEqual(ArtifactType.APP), { default: ArtifactType.APP })
  .mixin(MixinSoftware)
  .create();

/** Nerd Gear artifacts are software meant for developers. */
export const NerdGearArtifact = Artifact.extend('NerdGearArtifact')
  .prop('type', types.String.mustEqual(ArtifactType.NERD_GEAR), { default: ArtifactType.NERD_GEAR })
  .mixin(MixinSoftware)
  .create();

/** Game artifacts are software intended to be entertainment. */
export const GameArtifact = Artifact.extend('GameArtifact')
  .prop('type', types.String.mustEqual(ArtifactType.GAME), { default: ArtifactType.GAME })
  .mixin(MixinSoftware)
  .create();

/** Music Video artifacts are a cross between music and video artifacts. */
export const MusicVideoArtifact = Artifact.extend('MusicVideoArtifact')
  .prop('type', types.String.mustEqual(ArtifactType.MUSIC_VIDEO), {
    default: ArtifactType.MUSIC_VIDEO,
  })
  .prop('music', AudioMedia)
  .prop('video', VideoMedia)
  .method('toVideoArtifact', function () {
    return new VideoArtifact({
      ...this,
      // this is a bug with structure
      type: ArtifactType.VIDEO as never,
    });
  })
  .method('toMusicArtifact', function () {
    return new MusicArtifact({
      ...this,
      // this is a bug with structure
      type: ArtifactType.MUSIC as never,
      id: 'music/' + this.id,
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
export type DoodleArtifact = Instance<typeof DoodleArtifact>;
