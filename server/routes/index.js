import { Router } from "express";
import packingListRoutes from "./packingListRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import itemRoutes from "./itemRoutes.js";
import userRoutes from "./userRoutes.js";
import tokenRoutes from "./tokenRoutes.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = Router();

router.use("/packing_lists", authenticateToken, packingListRoutes);
router.use("/categories", authenticateToken, categoryRoutes);
router.use("/items", authenticateToken, itemRoutes);
router.use("/users", userRoutes);
router.use("/tokens", tokenRoutes);

export default router