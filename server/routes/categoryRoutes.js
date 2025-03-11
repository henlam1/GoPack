import { Router } from "express";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

const router = Router();

router.get("/", getCategories);
router.post("/", addCategory);
router.route("/:categoryId").patch(updateCategory).delete(deleteCategory);

export default router;
