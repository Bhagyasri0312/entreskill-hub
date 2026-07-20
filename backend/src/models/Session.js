import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    mentorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    topic: { type: String, required: true, trim: true },
    scheduledAt: { type: Date, default: null },
    status: { type: String, default: 'scheduled' },
    notes: { type: String, default: '' }
  },
  { timestamps: true, collection: 'sessions' }
);

const Session = mongoose.model('Session', sessionSchema);

export default Session;