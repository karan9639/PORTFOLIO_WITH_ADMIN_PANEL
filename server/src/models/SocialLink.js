import mongoose from 'mongoose';
import { createBaseCollectionSchema } from './helpers.js';

const schema = createBaseCollectionSchema({
  label: { type: String, required: true },
  icon: { type: String, default: 'globe' },
  url: { type: String, required: true },
});

export const SocialLink = mongoose.model('SocialLink', schema);
