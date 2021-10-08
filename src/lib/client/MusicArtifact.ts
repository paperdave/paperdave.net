import { ArtifactClient } from './ArtifactClient';

export class MusicArtifact extends ArtifactClient {
  get file(): string {
    return this.getProperty('file');
  }

  get sheetmusicImage(): string {
    return this.getProperty('sheetmusic_image');
  }
}
