import { Data } from '$lib/structures';
import { User } from '$lib/structures/User';
import m from 'mongoose';

export const UserSchema = new m.Schema<Data<User>>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  permissions: {
    type: [String],
    required: true,
  },
} as any);

export const UserModel = (m as any).model('User', UserSchema) as m.Model<Data<User>>;
