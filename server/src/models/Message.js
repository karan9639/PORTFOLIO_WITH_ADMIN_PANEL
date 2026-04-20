import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, default: '' },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'read', 'archived'], default: 'new' },
  source: { type: String, default: 'portfolio-site' },
}, { timestamps: true });

export const Message = mongoose.model('Message', schema);
