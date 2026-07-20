import { Router } from 'express';
import {
  forgotPassword,
  getMe,
  login,
  logout,
  resetPassword,
  signup,
  verifyOtp
} from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/signup', signup);
router.post('/verify-otp', verifyOtp);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/me', requireAuth, getMe);
router.post('/logout', logout);

export default router;