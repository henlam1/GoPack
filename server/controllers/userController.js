import tryCatch from "../utils/tryCatch.js";
import UserService from "../services/userService.js";

export const getUsers = tryCatch(async (req, res, next) => {
  const users = await UserService.getUsers();
  res.status(200).json(users);
});

export const getUserById = tryCatch(async (req, res, next) => {
  const { userId } = req.params;
  const user = await UserService.getUserById(userId);
  res.status(200).json(user);
});

export const addUser = tryCatch(async (req, res, next) => {
  const newUser = await UserService.addUser(req.body);
  res.status(201).json(newUser);
});

export const updateUser = tryCatch(async (req, res, next) => {
  const { userId } = req.params;
  const updatedUser = await UserService.updateUser(userId, req.body);
  res.status(200).json(updatedUser);
});

export const deleteUser = tryCatch(async (req, res, next) => {
  const { userId } = req.params;
  const deletedUser = await UserService.deleteUser(userId);
  res.status(200).json(deletedUser);
});
