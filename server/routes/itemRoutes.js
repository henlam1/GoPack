import { Router } from "express";
import { getItems, addItem } from "../controllers/itemController.js";
import validationMiddleware from "../middleware/validationMiddleware.js";
import itemSchema from "../validationSchemas/itemSchema.js";

const router = Router();

router.get("/", getItems);
router.post("/", validationMiddleware(itemSchema), addItem);

export default router;
