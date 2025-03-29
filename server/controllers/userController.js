import tryCatch from "../utils/tryCatch.js";
import UserService from "../services/userService.js";
import bcrypt from "bcrypt";

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
  const user = await UserService.getUserByEmail(req.body.email)

  if(user == null) {
    const newUser = await UserService.addUser(req.body);
    res.status(201).json(newUser);
  } else {
    res.status(409).send('User already exists');
  }
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

export const loginUser = tryCatch(async (req, res, next) => {
  const user = await UserService.getUserByUserName(req.body.username)
  if(user == null) {
    return res.status(404).send('Cannot find user');
  }
  try {
    const matchingPassword = await bcrypt.compare(req.body.password, user.password);
    if(matchingPassword) {
      res.status(200).send('Success');
    } else {
      res.status(400).send('Not Allowed');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});