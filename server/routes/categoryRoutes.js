import { Router } from 'express';
import {
  getCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';
import validationMiddleware from '../middleware/validationMiddleware.js';
import { categorySchema } from '../validationSchemas/categorySchema.js';
import validObjectId from '../middleware/validObjectId.js';

const router = Router();

router
  .route('/')
  .get(getCategories)
  .post(validationMiddleware(categorySchema), addCategory);
router
  .route('/:categoryId')
  .all(validObjectId('categoryId'))
  .get(getCategoryById)
  .patch(updateCategory)
  .delete(deleteCategory);

export default router;
