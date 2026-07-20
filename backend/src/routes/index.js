import { Router } from 'express';
import authRoutes from './authRoutes.js';
import usersRoutes from './usersRoutes.js';
import skillRoutes from './skillRoutes.js';
import businessIdeaRoutes from './businessIdeaRoutes.js';
import roadmapRoutes from './roadmapRoutes.js';
import courseRoutes from './courseRoutes.js';
import mentorRoutes from './mentorRoutes.js';
import progressRoutes from './progressRoutes.js';
import bookmarkRoutes from './bookmarkRoutes.js';
import sessionRoutes from './sessionRoutes.js';
import notificationRoutes from './notificationRoutes.js';
import feedbackRoutes from './feedbackRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/skills', skillRoutes);
router.use('/business-ideas', businessIdeaRoutes);
router.use('/roadmaps', roadmapRoutes);
router.use('/courses', courseRoutes);
router.use('/mentors', mentorRoutes);
router.use('/progress', progressRoutes);
router.use('/bookmarks', bookmarkRoutes);
router.use('/sessions', sessionRoutes);
router.use('/notifications', notificationRoutes);
router.use('/feedback', feedbackRoutes);

export default router;
