import Joi from "joi";

export const categorySchema = Joi.object({
  name: Joi.string().max(30).trim().required().messages({
    "string.base": "Category name should be a string",
    "string.empty": "Category name is required",
    "string.max": "Category name has a maximum length of 30 characters",
    "any.required": "Category name is required",
  }),
  items: Joi.array().items(Joi.string().hex().length(24)).required().messages({
    "array.base": "Category references should be strings",
    "any.required": "Categories are required",
  }),
  packingList: Joi.string().hex().length(24).required().messages({
    "string.base": "Packing list reference must be a string",
    "string.hex": "Packing list reference must be a hex string",
    "any.required": "Packing list reference is required",
  }),
});
