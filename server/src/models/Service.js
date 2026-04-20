import mongoose from 'mongoose';
import { createBaseCollectionSchema } from './helpers.js';

const schema = createBaseCollectionSchema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: 'sparkles' },
  deliverables: [{ type: String }],
});

export const Service = mongoose.model('Service', schema);
