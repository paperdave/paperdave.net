import { Data, JSONData } from './structure-utils';

export class QuestionParagraph {
  who: 'question' | 'answer';
  message: string;

  constructor(data?: Data<QuestionParagraph>) {
    if (data) {
      if (Array.isArray(data)) {
        this.message = data[1];
        this.who = data[0];
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

  static answer(message: string) {
    return new QuestionParagraph({
      message,
      who: 'answer',
    });
  }

  static question(message: string) {
    return new QuestionParagraph({
      message,
      who: 'question',
    });
  }
}

export class Question {
  date: Date;
  content: QuestionParagraph[];

  constructor(data?: Data<Question>) {
    if (data) {
      if ('d' in data) {
        let legacy = data as any;
        this.date = new Date(legacy.d);
        if (legacy.q) {
          this.content = [QuestionParagraph.question(legacy.q), QuestionParagraph.answer(legacy.a)];
        } else {
          this.content = legacy.c.map((paragraph) => new QuestionParagraph(paragraph));
        }
      } else {
        this.date = data.date;
        this.content = data.content.map((paragraph) => new QuestionParagraph(paragraph));
      }
    }
  }

  toJSON() {
    return {
      d: this.date.toISOString(),
      c: this.content.map((paragraph) => paragraph.toJSON()),
    };
  }

  static fromJSON(data: JSONData<Question>) {
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
}
