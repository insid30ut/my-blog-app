import mongoose, { Schema, model, models } from 'mongoose';

const TekSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: String }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export default models.Tek || model('Tek', TekSchema);