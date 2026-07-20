import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    subject: { type: String, required: true, trim: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    message: { type: String, required: true },
    category: { type: String, default: '' }
  },
  { timestamps: true, collection: 'feedback' }
);

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;