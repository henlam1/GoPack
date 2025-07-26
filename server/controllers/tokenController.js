import tryCatch from '../utils/tryCatch.js';
import TokenService from '../services/TokenService.js';
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

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      throw new InvalidRefreshTokenError();
    }

    // Create new access token
    const accessToken = TokenService.generateAccessToken({ userId: user._id });

    // Set new access token cookie
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000,
    });

    res.status(200).json({ message: 'Token refreshed successfully' });
  });
});
