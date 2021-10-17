import { Data, JSONData, schema } from './structure-utils';

@schema('brain')
export class BrainPost {
  date: Date;
  text: string;

  constructor(data?: Data<BrainPost>) {
    if (data) {
      this.date = data.date;
      this.text = data.text;
    } else {
      this.date = new Date();
      this.text = '';
    }
  }

  toJSON() {
    return {
      _v: 0,
      date: this.date.getTime(),
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
