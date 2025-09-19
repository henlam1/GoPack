import jwt from 'jsonwebtoken';
import {
  InvalidAccessTokenError,
  MissingAccessTokenError,
} from './errors/errorClasses.js';

const JWT_SECRET = process.env.JWT_SECRET || 'RANDOM-TOKEN';

const authenticateToken = (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    throw new MissingAccessTokenError();
  }

  jwt.verify(accessToken, JWT_SECRET, (err, decoded) => {
    if (err) {
      throw new InvalidAccessTokenError();
    }

    const { userId, userEmail } = decoded;
    req.user = {
      userId: userId,
      userEmail: userEmail,
    };
    next();
  });
};

export default authenticateToken;
