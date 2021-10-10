import { Data, Question } from '$lib/structures';
import m from 'mongoose';

export const QuestionSchema = new m.Schema<Data<Question>>({
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

export const QuestionModel = (m as any).model('Question', QuestionSchema) as m.Model<
  Data<Question>
>;
