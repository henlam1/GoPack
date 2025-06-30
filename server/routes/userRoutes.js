import { Router } from "express";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
} from "../controllers/userController.js";
import validationMiddleware from "../middleware/validationMiddleware.js";
import { userSchema } from "../validationSchemas/userSchema.js";

const router = Router();

router.route("/")
  .get(getUsers)
  .post(validationMiddleware(userSchema), addUser)
router.route("/:userId")
  .patch(updateUser)
  .delete(deleteUser);
router.route("/login")
  .post(loginUser);
router.route("/logout")
  .post(logoutUser)
  
export default router;
