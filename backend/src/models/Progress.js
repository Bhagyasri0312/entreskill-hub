import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: { type: String, required: true, trim: true },
    category: { type: String, default: '' },
    percentage: { type: Number, default: 0 },
    milestones: { type: [String], default: [] }
  },
  { timestamps: true, collection: 'progress' }
);

const Progress = mongoose.model('Progress', progressSchema);

export default Progress;