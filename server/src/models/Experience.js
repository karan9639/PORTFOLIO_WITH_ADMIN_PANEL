import mongoose from 'mongoose';
import { createBaseCollectionSchema } from './helpers.js';

const schema = createBaseCollectionSchema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  location: { type: String, default: '' },
  period: { type: String, required: true },
  current: { type: Boolean, default: false },
  description: { type: String, required: true },
  highlights: [{ type: String }],
});

export const Experience = mongoose.model('Experience', schema);
