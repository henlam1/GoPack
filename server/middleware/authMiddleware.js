import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "defaultSecret";

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    throw new AuthError("No token provided");
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      throw new AuthError("Failed to authenticate token");
    }
    req.userId = decoded?.indexOf;
    next();
  });
};

export default authMiddleware;
