import Joi from "joi";

const packingListSchema = Joi.object({
  name: Joi.string().max(30).trim().required().messages({
    "string.base": "Packing list name should be a string",
    "string.empty": "Packing list name is required",
    "string.max": "Packing list name has a maximum length of 30 characters",
    "any.required": "Packing list name is required",
  }),
  categories: Joi.array()
    .items(Joi.string().hex().length(24))
    .required()
    .messages({
      "array.base": "Category references should be strings",
      "any.required": "Categories are required",
    }),
  user: Joi.string().hex().length(24).required().messages({
    "string.base": "User reference must be a string",
    "string.hex": "User reference must be a hex string",
    "any.required": "User reference is required",
  }),
});

export default packingListSchema;
