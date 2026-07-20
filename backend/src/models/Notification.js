import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    category: { type: String, default: '' }
  },
  { timestamps: true, collection: 'notifications' }
);

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;