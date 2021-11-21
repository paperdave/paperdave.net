import { FileArtifact } from './FileArtifact';

export class JournalArtifact extends FileArtifact {
  static type = 'journal';

  get editDate(): Date {
    return new Date(this.getProperty('edit-date'));
  }

  set editDate(value: Date) {
    this.setProperty('edit-date', value.toUTCString());
  }

  setEditDate(value: Date) {
    this.editDate = value;
    return this;
  }
}
