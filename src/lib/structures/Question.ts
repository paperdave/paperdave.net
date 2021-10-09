import { Data, JSONData } from './structure-utils';

export class QuestionParagraph {
  who: 'question' | 'answer';
  message: string;

  constructor(data?: Data<QuestionParagraph>) {
    if (data) {
      this.message = data.message;
      this.who = data.who;
    }
  }

  toJSON(): JSONData<QuestionParagraph> {
    return {
      message: this.message,
      who: this.who,
    };
  }

  static fromJSON(data: JSONData<QuestionParagraph>) {
    return new QuestionParagraph({
      message: data.message,
      who: (data as any).who === 'q' ? 'question' : 'answer',
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
}

export class Question {
  date: Date;
  content: QuestionParagraph[];

  constructor(data?: Data<Question>) {
    if (data) {
      this.date = data.date;
      this.content = data.content;
    }
  }

  toJSON(): JSONData<Question> {
    return {
      date: this.date.toISOString(),
      // @ts-expect-error
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
}
