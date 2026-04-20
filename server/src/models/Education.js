import mongoose from 'mongoose';
import { createBaseCollectionSchema } from './helpers.js';

const schema = createBaseCollectionSchema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  field: { type: String, default: '' },
  period: { type: String, required: true },
  grade: { type: String, default: '' },
  description: { type: String, default: '' },
});

export const Education = mongoose.model('Education', schema);
