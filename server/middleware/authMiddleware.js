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

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      throw new InvalidAccessTokenError();
    }
    req.user = user;
    next();
  });
};

export default authenticateToken;
