import { Artifact } from './Artifact';
import { FileArtifact } from './FileArtifact';
import { JSONData } from './structure-utils';

export class FragmentArtifact extends FileArtifact {
  static type = 'fragment';
  static fromJSON(data: JSONData<Artifact>) {
    return new FragmentArtifact(Artifact.fromJSON(data));
  }
}
