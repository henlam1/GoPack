import { Router } from 'express';
import {
  getPackingLists,
  getPackingListById,
  addPackingList,
  updatePackingList,
  deletePackingList,
} from '../controllers/packingListController.js';
import validationMiddleware from '../middleware/validationMiddleware.js';
import { packingListSchema } from '../validationSchemas/packingListSchema.js';
import validObjectId from '../middleware/validObjectId.js';

const router = Router();

router
  .route('/')
  .get(getPackingLists)
  .post(validationMiddleware(packingListSchema), addPackingList);
router
  .route('/:packingListId')
  .get(validObjectId('packingListId'), getPackingListById)
  .patch(validObjectId('packingListId'), updatePackingList)
  .delete(validObjectId('packingListId'), deletePackingList);

export default router;
