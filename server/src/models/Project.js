import mongoose from 'mongoose';
import { createBaseCollectionSchema } from './helpers.js';
import { slugify } from '../utils/slugify.js';

const schema = createBaseCollectionSchema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  excerpt: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, default: '' },
  technologies: [{ type: String }],
  githubUrl: { type: String, default: '' },
  liveUrl: { type: String, default: '' },
  caseStudyUrl: { type: String, default: '' },
  role: { type: String, default: '' },
  year: { type: String, default: '' },
  duration: { type: String, default: '' },
  projectType: { type: String, default: '' },
  status: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  highlights: [{ type: String }],
});

schema.pre('validate', function(next) {
  if (!this.slug && this.title) this.slug = slugify(this.title);
  next();
});

export const Project = mongoose.model('Project', schema);
