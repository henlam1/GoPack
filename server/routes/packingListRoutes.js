import { Router } from "express";
import {
  getPackingLists,
  addPackingList,
} from "../controllers/packingListController.js";

const router = Router();

router.get("/", getPackingLists);
router.post("/", addPackingList);

export default router;
