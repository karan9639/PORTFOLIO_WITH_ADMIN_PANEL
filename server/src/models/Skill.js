import mongoose from 'mongoose';
import { createBaseCollectionSchema } from './helpers.js';

const schema = createBaseCollectionSchema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'SkillCategory', required: true },
  name: { type: String, required: true },
  icon: { type: String, default: 'code-xml' },
  level: { type: Number, min: 1, max: 100, default: 75 },
});

export const Skill = mongoose.model('Skill', schema);
