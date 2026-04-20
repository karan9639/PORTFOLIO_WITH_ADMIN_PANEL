import mongoose from 'mongoose';
import { createSingletonSchema } from './helpers.js';

const schema = createSingletonSchema({
  fullName: { type: String, required: true },
  headline: { type: String, required: true },
  tagline: { type: String, required: true },
  location: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  avatarUrl: { type: String, default: '' },
  resumeUrl: { type: String, default: '' },
  yearsExperience: { type: String, default: '' },
  availability: { type: String, default: '' },
  shortBio: { type: String, default: '' },
  stats: [{ label: String, value: String }],
});

export const Profile = mongoose.model('Profile', schema);
