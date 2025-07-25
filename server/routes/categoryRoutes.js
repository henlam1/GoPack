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
  .get(validObjectId('categoryId'), getCategoryById)
  .patch(validObjectId('categoryId'), updateCategory)
  .delete(validObjectId('categoryId'), deleteCategory);

export default router;
