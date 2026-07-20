import mongoose from 'mongoose';

const businessIdeaSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: { type: String, required: true, trim: true },
    category: { type: String, default: '' },
    description: { type: String, default: '' },
    budget: { type: String, default: '' },
    location: { type: String, default: '' },
    tags: { type: [String], default: [] },
    status: { type: String, default: 'draft' }
  },
  { timestamps: true, collection: 'businessideas' }
);

const BusinessIdea = mongoose.model('BusinessIdea', businessIdeaSchema);

export default BusinessIdea;