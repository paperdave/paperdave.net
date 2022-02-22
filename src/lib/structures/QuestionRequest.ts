import { formatDate } from '$lib/utils/date';
import { Data, JSONData, schema } from './structure-utils';

@schema('question-requests')
export class QuestionRequest {
  date: Date;
  content: string;
  notificationEmail: string | undefined;
  // I do not like the fact im tracking this, as of 2022-02-22, but
  // one user in particular is messing with me too much and I want to
  // ban them from my page. I promise I won't mess with the data in
  // any other way.
  ipAddress: string | undefined;

  constructor(data?: Data<QuestionRequest>) {
    if (data) {
      this.date = new Date(data.date.getTime() - data.date.getMilliseconds());
      this.content = data.content;
      this.notificationEmail = data.notificationEmail;
    } else {
      this.date = new Date();
      this.content = '';
    }
  }

  toJSON() {
    return {
      _v: 0,
      date: this.date.getTime(),
      content: this.content,
      notificationEmail: this.notificationEmail,
      ipAddress: this.ipAddress
    };
  }

  static fromJSON(data: JSONData<QuestionRequest>) {
    return new QuestionRequest({
      date: new Date(data.date),
      content: data.content,
      notificationEmail: data.notificationEmail,
      ipAddress: data.ipAddress
    });
  }

  setDate(date: Date) {
    this.date = date;
    return this;
  }

  setContent(content: string) {
    this.content = content;
    return this;
  }

  setNotificationEmail(notificationEmail: string | undefined) {
    this.notificationEmail = notificationEmail;
    return this;
  }

  getDateId() {
    return formatDate(this.date, 'question-id');
  }
}
