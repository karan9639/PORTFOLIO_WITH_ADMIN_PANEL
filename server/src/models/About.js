import mongoose from 'mongoose';
import { createSingletonSchema } from './helpers.js';

const schema = createSingletonSchema({
  heading: { type: String, required: true },
  summary: { type: String, required: true },
  story: { type: String, required: true },
  approach: { type: String, default: '' },
  profileImageUrl: { type: String, default: '' },
  facts: [{ label: String, value: String }],
});

export const About = mongoose.model('About', schema);
