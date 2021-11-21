import { Artifact } from './Artifact';
import { SoftwareArtifact } from './SoftwareArtifact';
import { JSONData } from './structure-utils';

export class NerdGearArtifact extends SoftwareArtifact {
  static type = 'nerd-gear';
  
  static fromJSON(data: JSONData<Artifact>) {
    return new NerdGearArtifact(Artifact.fromJSON(data));
  }
}
