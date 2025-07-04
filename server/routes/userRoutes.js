import { Router } from "express";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  hydrateUser,
} from "../controllers/userController.js";
import validationMiddleware from "../middleware/validationMiddleware.js";
import authenticateToken from "../middleware/authMiddleware.js";
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
router.route("/hydrate")
  .get(authenticateToken, hydrateUser)
  
export default router;
