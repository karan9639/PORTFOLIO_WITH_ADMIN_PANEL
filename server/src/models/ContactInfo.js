import mongoose from 'mongoose';
import { createSingletonSchema } from './helpers.js';

const schema = createSingletonSchema({
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  location: { type: String, default: '' },
  timezone: { type: String, default: 'Asia/Kolkata' },
  calendlyUrl: { type: String, default: '' },
  whatsappUrl: { type: String, default: '' },
  intro: { type: String, default: '' },
});

export const ContactInfo = mongoose.model('ContactInfo', schema);
