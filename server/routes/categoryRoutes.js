import { Router } from "express";
import { getCategories, addCategory } from "../controllers/categoryController";

const router = Router();

router.get("/", getCategories);
router.post("/", addCategory);

export default router;
