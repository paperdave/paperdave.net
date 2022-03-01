// Questions use custom serializers to compress the format down A LOT.

import { formatDate } from '$lib/utils/date';
import { Instance, Structure, types } from '@davecode/structures';
import { getBaseOrigin } from './url-helpers';

export const QuestionParagraphType = types.Enum('QUESTION', 'ANSWER');
export type QuestionParagraphType = Instance<typeof QuestionParagraphType>;

export const QuestionParagraph = new Structure('QuestionParagraph')
  .prop('who', QuestionParagraphType)
  .prop('message', types.String)
  .create({
    customSerializer: {
      fromJSON(data: [string, 'q' | 'a']) {
        return new QuestionParagraph({
          message: data[1],
          who: data[0] === 'q' ? QuestionParagraphType.QUESTION : QuestionParagraphType.ANSWER,
        });
      },
      toJSON(paragraph: QuestionParagraph) {
        return [paragraph.who === QuestionParagraphType.QUESTION ? 'q' : 'a', paragraph.message];
      },
    },
  });

export const Question = new Structure('Question')
  .prop('date', types.Date)
  .prop('content', types.ArrayOf(QuestionParagraph))
  .method('isRejected', function name() {
    return this.content.length === 0;
  })
  .method('getDateId', function () {
    return formatDate(this.date, 'question-id');
  })
  .method('getURL', function (origin = getBaseOrigin()) {
    return new URL('/q+a/' + this.getDateId(), origin);
  })
  .method('addParagraphs', function (...paragraphs: (QuestionParagraph | QuestionParagraph[])[]) {
    this.content.push(...paragraphs.flat());
    return this;
  })
  .create({
    customSerializer: {
      fromJSON(data: { date: number; content: unknown[] }) {
        return new Question({
          date: new Date(data.date),
          content: Question.types.content.fromJSON(data.content),
        });
      },
      toJSON(question: Question) {
        return {
          date: question.date.getTime(),
          content: Question.types.content.toJSON(question.content),
        };
      },
    },
  });

export const QuestionPage = new Structure('QuestionPage')
  .prop('id', types.Number)
  .prop('questions', types.ArrayOf(Question))
  .prop('latest', types.Boolean, { default: () => false })
  .create();

export const QuestionRequest = new Structure('QuestionRequest')
  .prop('date', types.Date, { default: () => new Date() })
  .prop('content', types.String)
  // I do not like the fact im tracking this, as of 2022-02-22, but
  // one user in particular is messing with me too much and I want to
  // ban them from my page. I promise I won't mess with the data in
  // any other way.
  .prop('ipAddress', types.String.nullable)
  .prop('notifyEmail', types.String.nullable)
  .prop('notifyPush', types.String.nullable)
  .method('getDateId', function () {
    return formatDate(this.date, 'question-id');
  })
  .method('getURL', function (origin = getBaseOrigin()) {
    return new URL('/q+a/' + this.getDateId(), origin);
  })
  .create();

export type QuestionParagraph = Instance<typeof QuestionParagraph>;
export type Question = Instance<typeof Question>;
export type QuestionRequest = Instance<typeof QuestionRequest>;
export type QuestionPage = Instance<typeof QuestionPage>;

export function parseQuestionDateId(id: string) {
  const match = id.match(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/);
  if (!match) {
    return null;
  }
  const [, year, month, day, hour, minute, second] = match;
  return new Date(`${month} ${day} 20${year} ${hour}:${minute}:${second} EST`);
}
