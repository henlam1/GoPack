import { Router } from 'express';
import {
  getItems,
  getItemById,
  addItem,
  updateItem,
  deleteItem,
} from '../controllers/itemController.js';
import validationMiddleware from '../middleware/validationMiddleware.js';
import { itemSchema } from '../validationSchemas/itemSchema.js';
import validObjectId from '../middleware/validObjectId.js';

const router = Router();

router.route('/').get(getItems).post(validationMiddleware(itemSchema), addItem);
router
  .route('/:itemId')
  .all(validObjectId('itemId'))
  .get(getItemById)
  .patch(updateItem)
  .delete(deleteItem);

export default router;
