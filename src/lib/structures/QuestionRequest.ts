import { Data, JSONData, schema } from './structure-utils';

@schema('question-requests')
export class QuestionRequest {
  date: Date;
  content: string;
  notificationEmail: string | undefined;

  constructor(data?: Data<QuestionRequest>) {
    if (data) {
      this.date = data.date;
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
      date: this.date.toISOString(),
      content: this.content,
      notificationEmail: this.notificationEmail,
    };
  }

  static fromJSON(data: JSONData<QuestionRequest>) {
    return new QuestionRequest({
      date: new Date(data.date),
      content: data.content,
      notificationEmail: data.notificationEmail,
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
}
