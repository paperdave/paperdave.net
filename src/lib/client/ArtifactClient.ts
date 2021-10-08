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
  #data: IArtifactClient;
  #dataMap: Map<string, any>;

  constructor(data: IArtifactClient) {
    this.#data = data;
    this.#dataMap = new Map(Object.entries(this.#data.data));
  }

  get id(): string {
    return this.#data.id;
  }

  get title(): string {
    return this.#data.title;
  }

  get date(): Date {
    return new Date(this.#data.date);
  }

  get thumbnail(): string {
    return this.#data.thumbnail;
  }

  get type(): string {
    return this.#data.type;
  }

  get tags(): string[] {
    return this.#data.tags;
  }

  get data(): Map<string, any> {
    return this.#dataMap;
  }

  getProperty(key: string): any {
    return this.data.get(key);
  }
}
