import { Router } from "express";
import {
  getItems,
  addItem,
  updateItem,
  deleteItem,
} from "../controllers/itemController.js";
import validationMiddleware from "../middleware/validationMiddleware.js";
import itemSchema from "../validationSchemas/itemSchema.js";

const router = Router();

router.get("/", getItems);
router.post("/", validationMiddleware(itemSchema), addItem);
router.route("/:itemId").patch(updateItem).delete(deleteItem);

export default router;
