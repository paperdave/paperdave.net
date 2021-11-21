import { Artifact } from './Artifact';
import { FileArtifact } from './FileArtifact';
import { JSONData } from './structure-utils';

export class VideoArtifact extends FileArtifact {
  static type = 'video';
  
  static fromJSON(data: JSONData<Artifact>) {
    return new VideoArtifact(Artifact.fromJSON(data));
  }

  get notes(): string {
    return this.getProperty('notes');
  }

  set notes(value: string) {
    this.setProperty('notes', value);
  }

  setNotes(notes: string) {
    this.notes = notes;
    return this;
  }

  get ttms(): number {
    return this.getProperty('ttms');
  }

  set ttms(value: number) {
    this.setProperty('ttms', value);
  }

  setTTMS(ttms: number) {
    this.ttms = ttms;
    return this;
  }
}
