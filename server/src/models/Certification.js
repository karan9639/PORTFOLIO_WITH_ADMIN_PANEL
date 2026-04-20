import mongoose from 'mongoose';
import { createBaseCollectionSchema } from './helpers.js';

const schema = createBaseCollectionSchema({
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  issuedAt: { type: String, default: '' },
  credentialId: { type: String, default: '' },
  credentialUrl: { type: String, default: '' },
  description: { type: String, default: '' },
});

export const Certification = mongoose.model('Certification', schema);
