import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { generateOtp } from '../utils/otp.js';
import { signAuthToken } from '../utils/jwt.js';

const authCookieOptions = {
  httpOnly: true,
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 7 * 24 * 60 * 60 * 1000
};

const buildAuthResponse = (res, user) => {
  const token = signAuthToken({ userId: user._id.toString(), role: user.role });

  res.cookie('token', token, authCookieOptions);

  return { token, user: user.toJSON() };
};

export const signup = async (req, res, next) => {
  try {
    const { name, email, password, role = 'user' } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    if (!['user', 'mentor', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role selected' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: 'An account with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const otpCode = generateOtp();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      otpCode,
      otpExpiresAt
    });

    const responsePayload = {
      message: 'Account created. Verify the OTP to continue.',
      user: user.toJSON()
    };

    if (process.env.NODE_ENV !== 'production') {
      responsePayload.otpCode = otpCode;
    }

    return res.status(201).json(responsePayload);
  } catch (error) {
    return next(error);
  }
};

export const verifyOtp = async (req, res, next) => {
  try {
    const { email, otpCode } = req.body;

    if (!email || !otpCode) {
      return res.status(400).json({ message: 'Email and OTP code are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({ message: 'Account not found' });
    }

    if (!user.otpCode || !user.otpExpiresAt || user.otpExpiresAt < new Date()) {
      return res.status(400).json({ message: 'OTP has expired. Please request a new code.' });
    }

    if (user.otpCode !== otpCode) {
      return res.status(400).json({ message: 'Invalid OTP code' });
    }

    user.isVerified = true;
    user.otpCode = null;
    user.otpExpiresAt = null;
    await user.save();

    const auth = buildAuthResponse(res, user);

    return res.json({ message: 'Email verified successfully', ...auth });
  } catch (error) {
    return next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (role && user.role !== role) {
      return res.status(403).json({ message: 'Role mismatch' });
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: 'Please verify your email before logging in' });
    }

    const auth = buildAuthResponse(res, user);

    return res.json({ message: 'Login successful', ...auth });
  } catch (error) {
    return next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({ message: 'Account not found' });
    }

    const resetPasswordToken = generateOtp();
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpiresAt = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();

    const responsePayload = {
      message: 'Password reset code generated'
    };

    if (process.env.NODE_ENV !== 'production') {
      responsePayload.resetPasswordToken = resetPasswordToken;
    }

    return res.json(responsePayload);
  } catch (error) {
    return next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { email, token, newPassword } = req.body;

    if (!email || !token || !newPassword) {
      return res.status(400).json({ message: 'Email, token, and new password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({ message: 'Account not found' });
    }

    if (
      !user.resetPasswordToken ||
      !user.resetPasswordExpiresAt ||
      user.resetPasswordExpiresAt < new Date() ||
      user.resetPasswordToken !== token
    ) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    user.password = await bcrypt.hash(newPassword, 12);
    user.resetPasswordToken = null;
    user.resetPasswordExpiresAt = null;
    await user.save();

    return res.json({ message: 'Password updated successfully' });
  } catch (error) {
    return next(error);
  }
};

export const getMe = async (req, res) => {
  return res.json({ user: req.user.toJSON() });
};

export const logout = async (_req, res) => {
  res.clearCookie('token', authCookieOptions);
  return res.json({ message: 'Logged out successfully' });
};