import { JSONData } from '.';
import { Question } from './Question';
import { Data } from './structure-utils';

export class QuestionPage {
  /** NEVER CHANGE THIS VALUE, IT WOULD MESS UP PAGE PERMALINKS */
  static SIZE = 25;

  id: number;
  questions: Question[];
  latest: boolean;

  constructor(data?: Data<QuestionPage>) {
    this.id = data?.id ?? 0;
    this.questions = data?.questions ?? [];
    this.latest = data?.latest ?? false;
  }

  static fromJSON(json: JSONData<QuestionPage>) {
    return new QuestionPage({
      id: json.id,
      questions: json.questions.map((q) => Question.fromJSON(q)),
      latest: json.latest ?? false,
    });
  }

  toJSON() {
    return {
      id: this.id,
      questions: this.questions.map((x) => x.toJSON()),
      latest: this.latest as boolean | undefined,
    };
  }
}
