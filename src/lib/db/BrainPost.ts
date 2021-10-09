import m from 'mongoose';

export interface IBrainPost {
  date: Date;
  text: string;
}

export const BrainPostSchema = new m.Schema<IBrainPost, m.Model<IBrainPost>>({
  date: {
    type: Date,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

export const BrainPostModel = (m as any).model('BrainPost', BrainPostSchema) as m.Model<IBrainPost>;
