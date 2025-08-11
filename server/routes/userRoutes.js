import { Router } from 'express';
import {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  hydrateUser,
} from '../controllers/userController.js';
import validationMiddleware from '../middleware/validationMiddleware.js';
import authenticateToken from '../middleware/authMiddleware.js';
import { userSchema } from '../validationSchemas/userSchema.js';
import validObjectId from '../middleware/validObjectId.js';

const router = Router();

router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);
router.route('/hydrate').get(authenticateToken, hydrateUser);
router.route('/').get(getUsers).post(validationMiddleware(userSchema), addUser);
router
  .route('/:userId')
  .all(validObjectId('userId'))
  .get(getUserById)
  .patch(updateUser)
  .delete(deleteUser);

export default router;
