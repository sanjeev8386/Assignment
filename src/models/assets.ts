import mongoose, { Schema, Document, model } from 'mongoose';

export interface IAssets extends Document {
  title: string;
  url: string;
  description: string;
  isActive: boolean;
}

const Assets: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    url: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    isActive: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: true
  }
);

Assets.indexes();

const assetsSchema = model<IAssets>('Assets', Assets);

export default assetsSchema;
