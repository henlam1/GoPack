import { Router } from "express";
import packingListRoutes from "./packingListRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import itemRoutes from "./itemRoutes.js";
import userRoutes from "./userRoutes.js";

const router = Router();

router.use("/packing_lists", packingListRoutes);
router.use("/categories", categoryRoutes);
router.use("/items", itemRoutes);
router.use("/users", userRoutes);

export default router