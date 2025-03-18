import { Router } from "express";
import {
  getPackingLists,
  addPackingList,
  updatePackingList,
  deletePackingList,
} from "../controllers/packingListController.js";
import validationMiddleware from "../middleware/validationMiddleware.js";
import { packingListSchema } from "../validationSchemas/packingListSchema.js";

const router = Router();

router.route("/")
  .get(getPackingLists)
  .post(validationMiddleware(packingListSchema), addPackingList)
router.route("/:packingListId")
  .patch(updatePackingList)
  .delete(deletePackingList);
  
export default router;
