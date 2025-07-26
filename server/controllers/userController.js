import tryCatch from '../utils/tryCatch.js';
import UserService from '../services/UserService.js';
import TokenService from '../services/TokenService.js';
import bcrypt from 'bcrypt';
import {
  AuthError,
  NotFoundError,
  UserExistsError,
} from '../middleware/errors/errorClasses.js';

export const getUsers = tryCatch(async (req, res) => {
  const users = await UserService.getUsers();
  res.status(200).json(users);
});

export const getUserById = tryCatch(async (req, res) => {
  const { userId } = req.params;
  const user = await UserService.getUserById(userId);
  res.status(200).json(user);
});

export const addUser = tryCatch(async (req, res) => {
  const user = await UserService.getUserByEmail(req.body.email);
  if (user) {
    throw new UserExistsError();
  }

  const newUser = await UserService.addUser(req.body);
  res.status(201).json(newUser);
});

export const updateUser = tryCatch(async (req, res) => {
  const { userId } = req.params;
  const updatedUser = await UserService.updateUser(userId, req.body);
  res.status(200).json(updatedUser);
});

export const deleteUser = tryCatch(async (req, res) => {
  const { userId } = req.params;
  const deletedUser = await UserService.deleteUser(userId);
  res.status(200).json(deletedUser);
});

export const loginUser = tryCatch(async (req, res) => {
  const user = await UserService.getUserByUsername(req.body.username);

  if (user == null || typeof user.password !== 'string') {
    throw new NotFoundError();
  }

  // Verify passwords
  const matchingPassword = await bcrypt.compare(
    req.body.password,
    user.password,
  );

  if (!matchingPassword) {
    throw new AuthError();
  }

  //   create JWT tokens
  const accessToken = TokenService.generateAccessToken({
    userId: user._id,
    userEmail: user.email,
  });
  const refreshToken = TokenService.generateRefreshToken({ userId: user._id });

  //   Attach HTTP cookies
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    sameSite: true,
    secure: true,
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: true,
    secure: true,
    path: '/api/tokens/refresh', // Only sent to the endpoint that re-generates refresh tokens
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  //   return success response
  res.status(200).send({
    message: 'Login Successful',
    email: user.email,
  });
});

export const logoutUser = tryCatch(async (req, res) => {
  // Clear both cookies
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken', { path: '/api/tokens/refresh' });

  res.status(200).json({ message: 'Logged out successfully' });
});

export const hydrateUser = tryCatch(async (req, res) => {
  res.status(200).json(req.user.email);
});
