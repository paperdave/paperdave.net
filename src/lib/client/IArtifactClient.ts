export interface IArtifactClient {
  id: string;
  title: string;
  date: string;
  thumbnail: string;
  type: string;
  tags: string[];
  data: Record<string, any>;
}

export class ArtifactClient {
  constructor(private readonly _data: IArtifactClient) {
    this._dataMap = new Map(Object.entries(this._data.data));
  }

  get id(): string {
    return this._data.id;
  }

  get title(): string {
    return this._data.title;
  }

  get date(): Date {
    return new Date(this._data.date);
  }

  get thumbnail(): string {
    return this._data.thumbnail;
  }

  get type(): string {
    return this._data.type;
  }

  get tags(): string[] {
    return this._data.tags;
  }

  private _dataMap;
  get data(): Map<string, any> {
    return this._dataMap;
  }

  getProperty(key: string): any {
    return this.data.get(key);
  }
}

export class MusicArtifact extends ArtifactClient {
  constructor(data: IArtifactClient) {
    super(data);
  }

  get file(): string {
    return this.getProperty('file');
  }

  get sheetmusicImage(): string {
    return this.getProperty('sheetmusic_image');
  }
}
