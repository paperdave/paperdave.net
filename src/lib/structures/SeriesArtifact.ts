import { Artifact } from './Artifact';
import { FileArtifact } from './FileArtifact';
import { JSONData } from './structure-utils';

export class StoryArtifact extends FileArtifact {
  static fromJSON(data: JSONData<Artifact>) {
    return new StoryArtifact(Artifact.fromJSON(data));
  }

  get description(): string {
    return this.getProperty('description');
  }

  set description(value: string) {
    this.setProperty('description', value);
  }

  setDescription(value: string) {
    this.description = value;
    return this;
  }

  get medium(): string {
    return this.getProperty('medium');
  }

  set medium(value: string) {
    this.setProperty('medium', value);
  }

  setMedium(value: string) {
    this.medium = value;
    return this;
  }

  get finishDate(): Date {
    return new Date(this.getProperty('edit-date'));
  }

  set finishDate(value: Date) {
    this.setProperty('edit-date', value.toISOString());
  }

  setFinishDate(value: Date) {
    this.finishDate = value;
    return this;
  }
}
