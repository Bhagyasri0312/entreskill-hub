import mongoose from 'mongoose';

const bookmarkSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: { type: String, required: true, trim: true },
    url: { type: String, default: '' },
    type: { type: String, default: '' },
    notes: { type: String, default: '' }
  },
  { timestamps: true, collection: 'bookmarks' }
);

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

export default Bookmark;