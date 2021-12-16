import { JSONData } from '.';
import { Question } from './Question';
import { Data } from './structure-utils';

export class QuestionPage {
  /** NEVER CHANGE THIS VALUE, IT WOULD MESS UP PAGE PERMALINKS */
  static SIZE = 25;

  id: number;
  questions: Question[];

  constructor(data?: Data<QuestionPage>) {
    this.id = data?.id ?? 0;
    this.questions = data?.questions ?? [];
  }

  static fromJSON(json: JSONData<QuestionPage>) {
    return new QuestionPage({
      id: json.id,
      questions: json.questions.map((q) => Question.fromJSON(q)),
    });
  }

  toJSON() {
    return {
      id: this.id,
      questions: this.questions.map((x) => x.toJSON()),
    };
  }
}
