import { Artifact } from './Artifact';
import { JSONData, mapToRecord, recordToMap } from './structure-utils';

export class GraveyardArtifact extends Artifact {
  static type = 'graveyard';
  
  static fromJSON(data: JSONData<Artifact>) {
    return new GraveyardArtifact(Artifact.fromJSON(data));
  }

  #files: Map<string, string> | null = null;

  get description(): string {
    return this.getProperty('description');
  }

  set description(description: string) {
    this.setProperty('description', description);
  }

  setDescription(description: string) {
    this.description = description;
    return this;
  }

  get license(): string {
    return this.getProperty('license');
  }

  set license(license: string) {
    this.setProperty('license', license);
  }

  setLicense(license: string) {
    this.license = license;
    return this;
  }

  private _ensureFilesPropertyExists() {
    if (!this.#files) {
      this.#files = recordToMap(this.getProperty('files'));
    }
  }

  private _updateFilesProperty() {
    this.setProperty('files', mapToRecord(this.#files));
  }

  getFile(filename: string): string | null {
    this._ensureFilesPropertyExists();
    return this.#files.get(filename);
  }

  setFile(filename: string, content: string) {
    this._ensureFilesPropertyExists();
    this.#files.set(filename, content);
    this._updateFilesProperty();
    return this;
  }

  removeFile(filename: string) {
    this._ensureFilesPropertyExists();
    this.#files.delete(filename);
    this._updateFilesProperty();
    return this;
  }

  fileKeys(): string[] {
    this._ensureFilesPropertyExists();
    return Array.from(this.#files.keys());
  }

  fileValues(): string[] {
    this._ensureFilesPropertyExists();
    return Array.from(this.#files.values());
  }

  fileEntries(): [string, string][] {
    this._ensureFilesPropertyExists();
    return Array.from(this.#files.entries());
  }

  findFile(predicate: (filename: string, content: string) => boolean): string | null {
    this._ensureFilesPropertyExists();
    for (const [filename, content] of this.#files.entries()) {
      if (predicate(filename, content)) {
        return filename;
      }
    }
    return null;
  }

  get medium(): string {
    return this.getProperty('medium');
  }

  set medium(medium: string) {
    this.setProperty('medium', medium);
  }

  setMedium(medium: string) {
    this.medium = medium;
    return this;
  }
}
