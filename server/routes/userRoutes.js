import { Router } from "express";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = Router();

router.get("/", getUsers);
router.post("/", addUser);
router.route("/:userId").patch(updateUser).delete(deleteUser);

export default router;
