import { Data, JSONData, schema } from './structure-utils';

@schema('redirects')
export class LegacyRedirect {
  key: string;
  value: string;

  constructor(data?: Data<LegacyRedirect>) {
    if (data) {
      this.key = data.key;
      this.value = data.value;
    } else {
      this.key = '';
      this.value = '';
    }
  }

  toJSON() {
    return {
      _v: 0,
      key: this.key,
      value: this.value,
    };
  }

  static fromJSON(data: JSONData<LegacyRedirect>) {
    return new LegacyRedirect({
      key: data.key,
      value: data.value,
    });
  }

  setKey(key: string) {
    this.key = key;
    return this;
  }

  setValue(value: string) {
    this.value = value;
    return this;
  }

  /** Matches a vault key input with this VaultKey */
  match(input: string): string | null {
    if (this.key.startsWith('/')) {
      const regex = new RegExp(this.key.substring(1));
      const match = regex.exec(input);
      if (match) {
        return this.value.replace(/\$(\d+)/g, (x, y) => match[parseInt(y)]);
      }
    } else if (this.key === input) {
      return this.value;
    }
    return null;
  }
}
