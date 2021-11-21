import { Artifact } from './Artifact';

export abstract class FileArtifact extends Artifact {
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
