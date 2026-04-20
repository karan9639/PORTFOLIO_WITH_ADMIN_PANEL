import mongoose from 'mongoose';

export function createBaseCollectionSchema(definition) {
  return new mongoose.Schema({ ...definition, sortOrder: { type: Number, default: 0 } }, { timestamps: true });
}

export function createSingletonSchema(definition) {
  return new mongoose.Schema({ ...definition, singletonKey: { type: String, default: 'default', unique: true } }, { timestamps: true });
}
