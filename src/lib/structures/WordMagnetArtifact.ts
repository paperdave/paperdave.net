import { Artifact } from './Artifact';
import { FileArtifact } from './FileArtifact';
import { JSONData } from './structure-utils';

export class WordMagnetArtifact extends FileArtifact {
  static fromJSON(data: JSONData<Artifact>) {
    return new WordMagnetArtifact(Artifact.fromJSON(data));
  }
}
