import { Data, JSONData, schema } from './structure-utils';

export class QuestionParagraph {
  who: 'question' | 'answer';
  message: string;

  constructor(data?: Data<QuestionParagraph>) {
    if (data) {
      if (Array.isArray(data)) {
        this.message = data[1];
        this.who = data[0] === 'question' || data[0] === 'q' ? 'question' : 'answer';
      } else {
        this.message = data.message;
        this.who = data.who;
      }
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
    }
  }

  toJSON() {
    return {
      _v: 0,
      date: this.date.getTime(),
      content: this.content.map((paragraph) => paragraph.toJSON()),
    };
  }

  static fromJSON(data: any) {
    return new Question({
      date: new Date(data.d),
      content: data.c.map((paragraph) => QuestionParagraph.fromJSON(paragraph)),
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
