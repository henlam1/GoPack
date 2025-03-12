import { Router } from "express";
import {
  getItems,
  getItemById,
  addItem,
  updateItem,
  deleteItem,
} from "../controllers/itemController.js";
import validationMiddleware from "../middleware/validationMiddleware.js";
import itemSchema from "../validationSchemas/itemSchema.js";

const router = Router();

router.route("/")
  .get(getItems)
  .post(validationMiddleware(itemSchema), addItem);
router.route("/:itemId")
  .get(getItemById)
  .patch(updateItem)
  .delete(deleteItem);

export default router;
