import { Router } from "express";
import packingListRoutes from "./packingListRoutes";
import categoryRoutes from "./categoryRoutes";
import itemRoutes from "./itemRoutes";
import userRoutes from "./userRoutes";

const router = Router();

router.use("/packingLists", packingListRoutes);
router.use("/categories", categoryRoutes);
router.use("/items", itemRoutes);
router.use("/users", userRoutes);

export default router