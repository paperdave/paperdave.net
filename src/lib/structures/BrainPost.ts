import { Data, JSONData } from './structure-utils';

export class BrainPost {
  date: Date;
  text: string;

  constructor(data?: Data<BrainPost>) {
    if (data) {
      this.date = data.date;
      this.text = data.text;
    }
  }

  toJSON() {
    return {
      date: this.date.toUTCString(),
      text: this.text,
    };
  }

  static fromJSON(data: JSONData<BrainPost>) {
    return new BrainPost({
      date: new Date(data.date),
      text: data.text,
    });
  }

  setDate(date: Date) {
    this.date = date;
  }

  setText(text: string) {
    this.text = text;
  }
}
