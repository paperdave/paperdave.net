import { Artifact } from './Artifact';
import { SoftwareArtifact } from './SoftwareArtifact';
import { JSONData } from './structure-utils';

export class AppArtifact extends SoftwareArtifact {
  static type = 'app';
  static fromJSON(data: JSONData<Artifact>) {
    return new AppArtifact(Artifact.fromJSON(data));
  }
}
