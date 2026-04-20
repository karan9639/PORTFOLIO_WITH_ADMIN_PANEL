import mongoose from 'mongoose';
import { createBaseCollectionSchema } from './helpers.js';

const schema = createBaseCollectionSchema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dateLabel: { type: String, default: '' },
  icon: { type: String, default: 'trophy' },
});

export const Achievement = mongoose.model('Achievement', schema);
