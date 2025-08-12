import jwt from 'jsonwebtoken';
import getEnv from '../config/env.js';

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'RANDOM-TOKEN';
const JWT_SECRET = process.env.JWT_SECRET || 'RANDOM-TOKEN';
const { isProd } = getEnv();
const sameSite = isProd ? false : true;

class TokenService {
  generateAccessToken(data) {
    const token = jwt.sign(data, JWT_SECRET, { expiresIn: '15m' });
    return token;
  }

  generateRefreshToken(data) {
    const token = jwt.sign(data, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    return token;
  }

  setAccessToken(res, accessToken) {
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: sameSite,
      secure: true,
      maxAge: 15 * 60 * 1000, // 15 minutes
    });
  }

  setRefreshToken(res, refreshToken) {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: sameSite,
      secure: true,
      path: '/api/tokens/refresh', // Only sent to the endpoint that re-generates refresh tokens
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  }
}

export default new TokenService();
