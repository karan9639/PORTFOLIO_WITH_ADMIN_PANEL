import mongoose from 'mongoose';
import { createSingletonSchema } from './helpers.js';

const schema = createSingletonSchema({
  badge: { type: String, default: '' },
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  highlightedName: { type: String, required: true },
  description: { type: String, required: true },
  primaryCtaText: { type: String, default: 'View projects' },
  primaryCtaLink: { type: String, default: '#projects' },
  secondaryCtaText: { type: String, default: 'Contact me' },
  secondaryCtaLink: { type: String, default: '#contact' },
  heroImageUrl: { type: String, default: '' },
});

export const Hero = mongoose.model('Hero', schema);
