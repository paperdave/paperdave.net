import { Artifact } from './Artifact';
import { FileArtifact } from './FileArtifact';
import { JSONData } from './structure-utils';

export class SquareArtifact extends FileArtifact {
  static type = 'square';
  static fromJSON(data: JSONData<Artifact>) {
    return new SquareArtifact(Artifact.fromJSON(data));
  }
}
