import mongoose from 'mongoose';
import { createBaseCollectionSchema } from './helpers.js';

const schema = createBaseCollectionSchema({
  name: { type: String, required: true, unique: true },
  description: { type: String, default: '' },
});

export const SkillCategory = mongoose.model('SkillCategory', schema);
