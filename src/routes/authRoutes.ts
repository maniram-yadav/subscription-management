import { Router } from 'express';
import {
  register,
  login,
  getProfile,
  getAllUsers,
  getUserById,
  updateUser,
  createSubscription,
  getUserSubscriptions,
  getSubscription,
  updateSubscription,
  deleteSubscription,
} from '../controllers/authController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authMiddleware, getProfile);

// Admin / user management endpoints (require auth)
router.get('/users', authMiddleware, getAllUsers);
router.get('/users/:id', authMiddleware, getUserById);
router.put('/users/:id', authMiddleware, updateUser);

// Subscription endpoints (require auth)
router.post('/subscriptions', authMiddleware, createSubscription);
router.get('/subscriptions', authMiddleware, getUserSubscriptions);
router.get('/subscriptions/:id', authMiddleware, getSubscription);
router.put('/subscriptions/:id', authMiddleware, updateSubscription);
router.delete('/subscriptions/:id', authMiddleware, deleteSubscription);

export default router;
