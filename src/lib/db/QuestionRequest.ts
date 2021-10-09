import m from 'mongoose';

export interface IQuestionRequest {
  date: Date;
  question: string;
  email?: string;
}

export const QuestionRequestSchema = new m.Schema<IQuestionRequest, m.Model<IQuestionRequest>>({
  date: {
    type: Date,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
});

export const QuestionRequestModel = (m as any).model(
  'QuestionRequest',
  QuestionRequestSchema
) as m.Model<IQuestionRequest>;
