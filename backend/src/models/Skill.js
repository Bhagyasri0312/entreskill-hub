import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: { type: String, required: true, trim: true },
    category: { type: String, default: '' },
    level: { type: String, default: 'beginner' },
    description: { type: String, default: '' },
    tags: { type: [String], default: [] }
  },
  { timestamps: true, collection: 'skills' }
);

const Skill = mongoose.model('Skill', skillSchema);

export default Skill;