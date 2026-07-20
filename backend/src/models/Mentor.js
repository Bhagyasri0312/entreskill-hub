import mongoose from 'mongoose';

const mentorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: { type: String, required: true, trim: true },
    expertise: { type: String, default: '' },
    bio: { type: String, default: '' },
    languages: { type: [String], default: [] },
    availability: { type: String, default: '' },
    rating: { type: Number, default: 0 }
  },
  { timestamps: true, collection: 'mentors' }
);

const Mentor = mongoose.model('Mentor', mentorSchema);

export default Mentor;