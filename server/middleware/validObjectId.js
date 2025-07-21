import mongoose from "mongoose";
import { ValidationError } from "./errors/errorClasses.js";

// Verify object IDs in query params
const validObjectId = (key) => (req, res, next) => {
  const id = req.params[key];

  if (!mongoose.isValidObjectId(id)) {
    throw new ValidationError("Invalid query id");
  }
  next();
};

export default validObjectId;
