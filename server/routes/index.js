import { Router } from 'express';
import packingListRoutes from './packingListRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import itemRoutes from './itemRoutes.js';
import userRoutes from './userRoutes.js';
import tokenRoutes from './tokenRoutes.js';
import authenticateToken from '../middleware/authMiddleware.js';
import testDataRoutes from './testDataRoutes.js';

const router = Router();
const ENABLE_AUTH = process.env.ENABLE_AUTH === 'true';

// Conditional middleware
if (ENABLE_AUTH) {
  router.use('/packing-lists', authenticateToken, packingListRoutes);
  router.use('/categories', authenticateToken, categoryRoutes);
  router.use('/items', authenticateToken, itemRoutes);
  // router.use('/users', authenticateToken, privateUserRoutes);
} else {
  router.use('/packing-lists', packingListRoutes);
  router.use('/categories', categoryRoutes);
  router.use('/items', itemRoutes);
  // router.use('/users', privateUserRoutes);
}

// Public routes
router.use('/users', userRoutes);
router.use('/tokens', tokenRoutes);

// Test routes
if (process.env.NODE_ENV !== 'production') {
  router.use('/test-db', testDataRoutes);
}

export default router;
