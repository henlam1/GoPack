import tryCatch from '../utils/tryCatch.js';
import UserService from '../services/userService.js';
import TokenService from '../services/tokenService.js';
import jwt from 'jsonwebtoken';
import {
  InvalidRefreshTokenError,
  MissingRefreshTokenError,
} from '../middleware/errors/errorClasses.js';

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'RANDOM-TOKEN';

export const refreshToken = tryCatch(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new MissingRefreshTokenError();
  }

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      throw new InvalidRefreshTokenError();
    }

    // Get user info
    const user = await UserService.getUserById(decoded.userId);

    // Create new access token
    const accessToken = TokenService.generateAccessToken({
      userId: user._id,
      userEmail: user.email,
    });

    // Set new access token cookie
    TokenService.setAccessToken(res, accessToken);

    res.status(200).json({ message: 'Token refreshed successfully' });
  });
});
