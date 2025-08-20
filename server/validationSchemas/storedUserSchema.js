import Joi from 'joi';

const storedUserSchema = Joi.object({
  username: Joi.string().min(3).max(30).trim().required().messages({
    'string.base': 'Username should be a string',
    'string.empty': 'Username is required',
    'string.min': 'Username has a minimum length of 1 character',
    'string.max': 'Username has a maximum length of 30 characters',
    'any.required': 'Username is required',
  }),
  password: Joi.string().min(60).required().messages({
    'string.base': 'Password should be a string',
    'string.min': 'Hashed password has a minimum length of 60 characters',
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'Email should be a string',
    'string.email': 'Email must be valid',
    'any.required': 'Email is required',
  }),
  packingLists: Joi.array().items(Joi.string().hex().length(24)).messages({
    'array.base': 'Packing list references should be strings',
  }),
});

export default storedUserSchema;
