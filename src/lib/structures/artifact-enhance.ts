import { AppArtifact } from './AppArtifact';
import { Artifact } from './Artifact';
import { FragmentArtifact } from './FragmentArtifact';
import { GameArtifact } from './GameArtifact';
import { GraveyardArtifact } from './GraveyardArtifact';
import { JournalArtifact } from './JournalArtifact';
import { MusicArtifact } from './MusicArtifact';
import { NerdGearArtifact } from './NerdGearArtifact';
import { SquareArtifact } from './SquareArtifact';
import { StoryArtifact } from './StoryArtifact';
import { JSONData } from './structure-utils';
import { VideoArtifact } from './VideoArtifact';
import { WordMagnetArtifact } from './WordMagnetArtifact';

export const artifactTypeMap: Record<string, typeof Artifact> = {
  unknown: Artifact,
  video: VideoArtifact,
  music: MusicArtifact,
  app: AppArtifact,
  fragment: FragmentArtifact,
  graveyard: GraveyardArtifact,
  journal: JournalArtifact,
  'nerd-gear': NerdGearArtifact,
  game: GameArtifact,
  story: StoryArtifact,
  'word-magnet': WordMagnetArtifact,
  square: SquareArtifact,
};

export function enhanceArtifact(artifact: Artifact | JSONData<Artifact>) {
  if (!(artifact instanceof Artifact)) artifact = Artifact.fromJSON(artifact);
  if (artifact.type in artifactTypeMap) {
    return new artifactTypeMap[artifact.type](artifact);
  } else {
    throw new Error('Unknown artifact type: ' + artifact.type);
  }
}
