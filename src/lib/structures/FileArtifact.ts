import { Artifact } from './Artifact';
import { JSONData } from './structure-utils';

export class FileArtifact extends Artifact {
  static fromJSON(data: JSONData<Artifact>) {
    return new FileArtifact(Artifact.fromJSON(data));
  }

  get file(): string {
    return this.getProperty('file');
  }

  set file(value: string) {
    this.setProperty('file', value);
  }

  setFile(file: string) {
    this.file = file;
    return this;
  }
}
