import mongoose from 'mongoose';
import { createSingletonSchema } from './helpers.js';

const schema = createSingletonSchema({
  siteTitle: { type: String, required: true },
  siteDescription: { type: String, required: true },
  footerText: { type: String, default: '' },
  seoKeywords: [{ type: String }],
  resumeUrl: { type: String, default: '' },
  openToWork: { type: Boolean, default: true },
  testimonialsEnabled: { type: Boolean, default: false },
});

export const SiteSettings = mongoose.model('SiteSettings', schema);
