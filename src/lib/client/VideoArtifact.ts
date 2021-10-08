import { ArtifactClient } from './ArtifactClient';

export class VideoArtifact extends ArtifactClient {
  get file(): string {
    return this.getProperty('file');
  }
}
