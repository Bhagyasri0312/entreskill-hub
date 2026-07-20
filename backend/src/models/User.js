import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      minlength: 8
    },
    role: {
      type: String,
      enum: ['user', 'mentor', 'admin'],
      default: 'user'
    },
    avatar: {
      type: String,
      default: ''
    },
    bio: {
      type: String,
      default: ''
    },
    skills: {
      type: [String],
      default: []
    },
    interests: {
      type: [String],
      default: []
    },
    budget: {
      type: String,
      default: ''
    },
    location: {
      type: String,
      default: ''
    },
    experience: {
      type: String,
      default: ''
    },
    languages: {
      type: [String],
      default: []
    },
    businessGoal: {
      type: String,
      default: ''
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    otpCode: {
      type: String,
      default: null
    },
    otpExpiresAt: {
      type: Date,
      default: null
    },
    resetPasswordToken: {
      type: String,
      default: null
    },
    resetPasswordExpiresAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    const sanitized = returnedObject;
    delete sanitized.password;
    delete sanitized.otpCode;
    delete sanitized.otpExpiresAt;
    delete sanitized.resetPasswordToken;
    delete sanitized.resetPasswordExpiresAt;
    return sanitized;
  }
});

const User = mongoose.model('User', userSchema);

export default User;