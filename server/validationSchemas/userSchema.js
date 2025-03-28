import Joi from "joi";

export const userSchema = Joi.object({
  username: Joi.string().min(3).max(30).trim().required().messages({
    "string.base": "Username should be a string",
    "string.empty": "Username is required",
    "string.min": "Username has a minimum length of 1 character",
    "string.max": "Username has a maximum length of 30 characters",
    "any.required": "Username is required",
  }),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,30}$"))
    .required()
    .messages({
      "string.base": "Password should be a string",
      "string.min": "Password has a minimum length of 8 characters",
      "string.max": "Password has a maximum length of 30 characters",
      "string.pattern": "Password must contain at least one letter and number",
    }),
  email: Joi.string().email().required().messages({
    "string.base": "Email should be a string",
    "string.email": "Email must be valid",
    "any.required": "Email is required",
  }),
  packingLists: Joi.array()
    .items(Joi.string().hex().length(24))
    .messages({
      "array.base": "Packing list references should be strings"
    }),
});
