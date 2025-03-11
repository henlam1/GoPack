import { Router } from "express";
import {
  getPackingLists,
  addPackingList,
  updatePackingList,
  deletePackingList,
} from "../controllers/packingListController.js";

const router = Router();

router.get("/", getPackingLists);
router.post("/", addPackingList);
router.route("/:packingListId").patch(updatePackingList).delete(deletePackingList);

export default router;
