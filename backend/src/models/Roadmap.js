import mongoose from 'mongoose';

const roadmapSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    steps: {
      type: [
        {
          title: { type: String, required: true },
          completed: { type: Boolean, default: false }
        }
      ],
      default: []
    },
    status: { type: String, default: 'active' }
  },
  { timestamps: true, collection: 'roadmaps' }
);

const Roadmap = mongoose.model('Roadmap', roadmapSchema);

export default Roadmap;