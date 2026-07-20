import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';
import {
  createUser,
  deleteUser,
  getMe,
  getUserById,
  listUsers,
  updateMe,
  updateUserById
} from '../controllers/userController.js';

const router = Router();

router.get('/', requireAuth, requireRole('admin'), listUsers);
router.post('/', requireAuth, requireRole('admin'), createUser);
router.get('/me', requireAuth, getMe);
router.patch('/me', requireAuth, updateMe);
router.get('/:id', requireAuth, getUserById);
router.patch('/:id', requireAuth, requireRole('admin'), updateUserById);
router.delete('/:id', requireAuth, requireRole('admin'), deleteUser);

export default router;