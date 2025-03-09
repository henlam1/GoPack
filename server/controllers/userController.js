import tryCatch from "../utils/tryCatch.js";
import UserService from "../services/userService.js";

export const getUsers = tryCatch(async (req, res, next) => {
  const users = await UserService.getUsers();
  res.status(200).json({ users: users });
});

export const addUser = tryCatch(async (req, res, next) => {
  const newUser = await UserService.addUser(req.body);
  res.status(201).json({
    message: "User added",
    user: newUser,
  });
});
