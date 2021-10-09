import { Artifact } from './Artifact';
import { FileArtifact } from './FileArtifact';
import { JSONData } from './structure-utils';

export class MusicArtifact extends FileArtifact {
  static fromJSON(data: JSONData<Artifact>) {
    return new MusicArtifact(Artifact.fromJSON(data));
  }

  get sheetmusicImage(): string {
    return this.getProperty('sheetmusic_image');
  }

  set sheetmusicImage(value: string) {
    this.setProperty('sheetmusic_image', value);
  }

  setSheetmusicImage(value: string) {
    this.setProperty('sheetmusic_image', value);
    return this;
  }
}
