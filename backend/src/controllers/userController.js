import bcrypt from 'bcryptjs';
import asyncHandler from '../utils/asyncHandler.js';
import User from '../models/User.js';

const isAdmin = (req) => req.user?.role === 'admin';

const findSelfOrAdmin = (req, userId) => isAdmin(req) || req.user?._id.toString() === userId.toString();

const buildUpdatableProfile = (body, allowedFields) => {

  return allowedFields.reduce((profile, field) => {
    if (body[field] !== undefined) {
      profile[field] = body[field];
    }

    return profile;
  }, {});
};

export const listUsers = asyncHandler(async (_req, res) => {
  const users = await User.find().sort('-createdAt');
  return res.json({ data: users });
});

export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, role = 'user' } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    return res.status(409).json({ message: 'An account with this email already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, password: hashedPassword, role, isVerified: true });

  return res.status(201).json({ message: 'User created', data: user });
});

export const getMe = asyncHandler(async (req, res) => {
  return res.json({ data: req.user });
});

export const updateMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: 'Account not found' });
  }

  const updates = buildUpdatableProfile(req.body, ['name', 'avatar', 'bio', 'skills', 'interests', 'budget', 'location', 'experience', 'languages', 'businessGoal']);
  Object.assign(user, updates);
  await user.save();

  return res.json({ message: 'Profile updated', data: user });
});

export const getUserById = asyncHandler(async (req, res) => {
  if (!findSelfOrAdmin(req, req.params.id)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: 'Account not found' });
  }

  return res.json({ data: user });
});

export const updateUserById = asyncHandler(async (req, res) => {
  if (!isAdmin(req)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: 'Account not found' });
  }

  const updates = buildUpdatableProfile(req.body, ['name', 'avatar', 'bio', 'skills', 'interests', 'budget', 'location', 'experience', 'languages', 'businessGoal', 'role']);
  Object.assign(user, updates);
  await user.save();

  return res.json({ message: 'User updated', data: user });
});

export const deleteUser = asyncHandler(async (req, res) => {
  if (!isAdmin(req)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: 'Account not found' });
  }

  await user.deleteOne();
  return res.json({ message: 'User deleted' });
});