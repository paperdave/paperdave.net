import { Data, JSONData, mapToRecord, recordToMap, schema } from './structure-utils';

@schema('artifacts')
export class Artifact {
  id: string;
  title: string;
  date: Date;
  thumbnail: string | null;
  type: string;
  tags: Set<string>;
  data: Map<string, any>;

  constructor(data?: Data<Artifact>) {
    if (data) {
      this.id = data.id;
      this.title = data.title;
      this.date = new Date(data.date);
      this.thumbnail = data.thumbnail;
      this.type = data.type;
      this.tags = data.tags;
      this.data = data.data;
    } else {
      this.id = '';
      this.title = '';
      this.date = new Date();
      this.thumbnail = null;
      this.type = 'unknown';
      this.tags = new Set();
      this.data = new Map();
    }
  }

  toJSON() {
    return {
      _v: 0,
      id: this.id,
      title: this.title,
      date: this.date.getTime(),
      thumbnail: this.thumbnail,
      type: this.type,
      tags: Array.from(this.tags),
      data: mapToRecord(this.data),
    };
  }

  static fromJSON(data: JSONData<Artifact>) {
    return new Artifact({
      id: data.id,
      title: data.title,
      date: new Date(data.date),
      thumbnail: data.thumbnail,
      type: data.type,
      tags: new Set(data.tags),
      data: recordToMap(data.data),
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
}
