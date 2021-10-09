import m from 'mongoose';

export type IQuestionParagraph = ['q' | 'a', string];

export interface IQuestion {
  date: Date;
  strings: IQuestionParagraph[];
}

export const QuestionSchema = new m.Schema<IQuestion, m.Model<IQuestion>>({
  date: {
    type: Date,
    required: true,
  },
  strings: {
    type: [
      {
        type: String,
        enum: ['q', 'a'],
      },
      {
        type: String,
      },
    ],
    required: true,
  },
} as any);

export const QuestionModel = (m as any).model('Question', QuestionSchema) as m.Model<IQuestion>;
