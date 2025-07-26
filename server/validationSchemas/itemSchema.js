import Joi from 'joi';

export const itemSchema = Joi.object({
  name: Joi.string().max(30).trim().required().messages({
    'string.base': 'Item name should be a string',
    'string.empty': 'Item name is required',
    'string.max': 'Item name has a maximum length of 30 characters',
    'any.required': 'Item name is required',
  }),
  quantity: Joi.number().min(1).max(99).required().messages({
    'number.base': 'Item quantity should be a number',
    'number.empty': 'Item quantity is required',
    'number.min': 'Item quantity has a minimum of 1',
    'number.max': 'Item quantity has a maximum of 99',
    'any.required': 'Item quantity is required',
  }),
  packed: Joi.boolean().required().messages({
    'boolean.base': 'Packed should be a boolean',
    'boolean.empty': 'Packed is required',
    'any.required': 'Packed is required',
  }),
  category: Joi.string().hex().length(24).required().messages({
    'string.base': 'Category reference must be a string',
    'string.hex': 'Category reference must be a hex string',
    'any.required': 'Category reference is required',
  }),
});
