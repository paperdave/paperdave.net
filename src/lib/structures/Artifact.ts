import { Data, JSONData, recordToMap, schema } from './structure-utils';

export enum ArtifactVisibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  DRAFT = 'DRAFT',
  UNLISTED = 'UNLISTED',
}

@schema('artifacts')
export class Artifact {
  static type = 'unknown';

  id: string;
  title: string;
  date: Date;
  thumbnail: string | undefined;
  blurhash: string | undefined;
  type: string;
  tags: Set<string>;
  data: Map<string, any>;
  visibility: ArtifactVisibility;

  constructor(data?: Data<Artifact>) {
    if (data) {
      this.id = data.id;
      this.title = data.title;
      this.date = new Date(data.date);
      this.thumbnail = data.thumbnail;
      this.blurhash = data.blurhash;
      this.type = data.type;
      this.tags = data.tags;
      this.data = data.data;
      this.visibility = data.visibility || ArtifactVisibility.PUBLIC;
    } else {
      this.id = '';
      this.title = '';
      this.date = new Date();
      this.date.setSeconds(0);
      this.date.setMinutes(0);
      this.date.setHours(12);
      this.thumbnail = undefined;
      this.blurhash = undefined;
      // @ts-ignore
      this.type = this.constructor.type ?? 'unknown';
      this.tags = new Set();
      this.data = new Map();
      this.visibility = ArtifactVisibility.DRAFT;
    }
  }

  toJSON() {
    const dataEntries = [...this.data.entries()] //
      .filter(([key, value]) => value !== undefined && value !== null && value !== '');
    const dataProperties = dataEntries.length > 0 ? Object.fromEntries(dataEntries) : undefined;

    const data = {
      _v: 0,
      id: this.id,
      title: this.title,
      date: this.date.getTime(),
      thumbnail: this.thumbnail ?? undefined,
      blurhash: this.blurhash ?? undefined,
      type: this.type,
      tags: this.tags.size > 0 ? Array.from(this.tags) : undefined,
      data: dataProperties,
      visibility: this.visibility ?? ArtifactVisibility.DRAFT,
    };
    return data;
  }

  static fromJSON(data: JSONData<Artifact>) {
    return new Artifact({
      id: data.id,
      title: data.title,
      date: new Date(data.date),
      thumbnail: data.thumbnail,
      blurhash: data.blurhash,
      type: data.type,
      tags: new Set(data.tags),
      data: recordToMap(data.data ?? {}),
      visibility: data.visibility,
    });
  }

  setId(id: string) {
    this.id = id;
    return this;
  }

  setTitle(title: string) {
    this.title = title;
    return this;
  }

  setDate(date: Date) {
    this.date = date;
    return this;
  }

  setThumbnail(thumbnail: string) {
    this.thumbnail = thumbnail;
    return this;
  }

  setBlurHash(blurhash: string) {
    this.blurhash = blurhash;
    return this;
  }

  setType(type: string) {
    this.type = type;
    return this;
  }

  setTags(tags: string[] | Set<string>) {
    this.tags = Array.isArray(tags) ? new Set(tags) : tags;
    return this;
  }

  addTag(tag: string) {
    this.tags.add(tag);
    return this;
  }

  removeTag(tag: string) {
    this.tags.delete(tag);
    return this;
  }

  hasTag(tag: string) {
    return this.tags.has(tag);
  }

  setProperty(key: string, value: any) {
    this.data.set(key, value);
    return this;
  }

  getProperty(key: string) {
    return this.data.get(key);
  }

  setVisibility(visibility: ArtifactVisibility) {
    this.visibility = visibility;
    return this;
  }
}
