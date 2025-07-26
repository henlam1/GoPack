import { ValidationError } from './errors/errorClasses.js';

// Joi schema validation middleware
const validationMiddleware = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    throw new ValidationError(error.details[0].message);
  }
  next();
};

export default validationMiddleware;
