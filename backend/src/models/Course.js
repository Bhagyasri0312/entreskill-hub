import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: { type: String, required: true, trim: true },
    provider: { type: String, default: '' },
    category: { type: String, default: '' },
    level: { type: String, default: 'beginner' },
    duration: { type: String, default: '' },
    url: { type: String, default: '' },
    description: { type: String, default: '' }
  },
  { timestamps: true, collection: 'courses' }
);

const Course = mongoose.model('Course', courseSchema);

export default Course;