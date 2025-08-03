import jwt from 'jsonwebtoken';

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'RANDOM-TOKEN';
const JWT_SECRET = process.env.JWT_SECRET || 'RANDOM-TOKEN';

class TokenService {
  generateAccessToken(data) {
    const token = jwt.sign(data, JWT_SECRET, { expiresIn: '15m' });
    return token;
  }

  generateRefreshToken(data) {
    const token = jwt.sign(data, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    return token;
  }
}

export default new TokenService();
