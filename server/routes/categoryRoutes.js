import { Router } from 'express';
import {
  getCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
  markAllPacked,
  getCategoryItems,
  suggestCategories,
  commitCategories,
} from '../controllers/categoryController.js';
import validationMiddleware from '../middleware/validationMiddleware.js';
import { categorySchema } from '../validationSchemas/categorySchema.js';
import validObjectId from '../middleware/validObjectId.js';

const router = Router();

router
  .route('/')
  .get(getCategories)
  .post(validationMiddleware(categorySchema), addCategory);
router.route('/suggest').post(suggestCategories);
router.route('/commit').post(commitCategories);
router
  .route('/:categoryId')
  .all(validObjectId('categoryId'))
  .get(getCategoryById)
  .patch(updateCategory)
  .delete(deleteCategory);
router
  .route('/:categoryId/mark-all-packed')
  .all(validObjectId('categoryId'))
  .patch(markAllPacked);
router
  .route('/:categoryId/items')
  .all(validObjectId('categoryId'))
  .get(getCategoryItems);

export default router;
