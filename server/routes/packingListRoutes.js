import { Router } from "express";
import {
  getPackingLists,
  addPackingList,
  getPackingListById,
  updatePackingList,
  deletePackingList,
} from "../controllers/packingListController.js";
import validationMiddleware from "../middleware/validationMiddleware.js";
import { packingListSchema } from "../validationSchemas/packingListSchema.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.route("/")
  .get(authMiddleware, getPackingLists)
  .post(validationMiddleware(packingListSchema), addPackingList)
router.route("/:packingListId")
  .get(getPackingListById)
  .patch(updatePackingList)
  .delete(deletePackingList);
  
export default router;
