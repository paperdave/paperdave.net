import { Data, JSONData, schema } from './structure-utils';

export class QuestionParagraph {
  private ui_uid = Math.floor(Math.random() * 999999).toString();

  who: 'question' | 'answer';
  message: string;

  constructor(data?: Data<QuestionParagraph>) {
    if (data) {
      this.message = data.message;
      this.who = data.who;
    } else {
      this.message = '';
      this.who = 'question';
    }
  }

  toJSON() {
    return [this.who === 'question' ? 'q' : 'a', this.message];
  }

  static fromJSON(data: JSONData<QuestionParagraph>) {
    return new QuestionParagraph({
      message: data[1],
      who: data[0] === 'q' ? 'question' : 'answer',
    });
  }

  getUiUid() {
    return this.ui_uid;
  }

  isQuestion() {
    return this.who === 'question';
  }

  isAnswer() {
    return this.who === 'answer';
  }

  setMessage(message: string) {
    this.message = message;
    return this;
  }

  setWho(who: 'question' | 'answer') {
    this.who = who;
    return this;
  }

  static question(message: string) {
    return new QuestionParagraph({
      message,
      who: 'question',
    });
  }

  static answer(message: string) {
    return new QuestionParagraph({
      message,
      who: 'answer',
    });
  }
}

@schema('questions')
export class Question {
  date: Date;
  content: QuestionParagraph[];

  constructor(data?: Data<Question>) {
    if (data) {
      this.date = new Date(data.date.getTime() - data.date.getMilliseconds());
      this.content = data.content;
    } else {
      this.date = new Date();
      this.content = [];
    }
  }

  toJSON() {
    return {
      _v: 0,
      date: this.date.getTime() - this.date.getMilliseconds(),
      content: this.content.map((paragraph) => paragraph.toJSON()),
    };
  }

  static fromJSON(data: JSONData<Question>) {
    return new Question({
      date: new Date(data.date),
      content: data.content.map((paragraph) => QuestionParagraph.fromJSON(paragraph)),
    });
  }

  setDate(date: Date = new Date()) {
    this.date = date;
    return this;
  }

  addParagraph(paragraph: QuestionParagraph) {
    this.content.push(paragraph);
    return this;
  }

  addQuestionParagraph(content: string) {
    return this.addParagraph(new QuestionParagraph({ message: content, who: 'question' }));
  }

  addAnswerParagraph(content: string) {
    return this.addParagraph(new QuestionParagraph({ message: content, who: 'answer' }));
  }

  setContent(content: QuestionParagraph[]) {
    this.content = content;
    return this;
  }

  getDateId() {
    return [
      this.date.getFullYear().toString().slice(2),
      (this.date.getMonth() + 1).toString(),
      this.date.getDate().toString(),
      this.date.getHours().toString(),
      this.date.getMinutes().toString(),
      this.date.getSeconds().toString(),
    ]
      .map((x) => x.padStart(2, '0'))
      .join('');
  }
}
