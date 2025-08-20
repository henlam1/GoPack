import jwt from 'jsonwebtoken';
import {
  InvalidAccessTokenError,
  MissingAccessTokenError,
} from './errors/errorClasses.js';

const JWT_SECRET = process.env.JWT_SECRET || 'RANDOM-TOKEN';

const authenticateToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    throw new MissingAccessTokenError();
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      throw new InvalidAccessTokenError();
    }
    req.user = {
      userId: decoded.userId,
      userEmail: decoded.userEmail,
    };
    next();
  });
};

export default authenticateToken;
