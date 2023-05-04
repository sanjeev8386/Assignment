import mongoose, { Schema, Document, model } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
}

const User: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true
  }
);

User.indexes();

const userSchema = model<IUser>('User', User);

export default userSchema;
