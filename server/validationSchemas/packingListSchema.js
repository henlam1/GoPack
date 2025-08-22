import Joi from 'joi';

export const packingListSchema = Joi.object({
  name: Joi.string().max(30).trim().required().messages({
    'string.base': 'Packing list name should be a string',
    'string.empty': 'Packing list name is required',
    'string.max': 'Packing list name has a maximum length of 30 characters',
    'any.required': 'Packing list name is required',
  }),
  startDate: Joi.string(),
  endDate: Joi.string(),
  destination: Joi.string()
    .allow('')
    .max(30)
    .messages({ 'string.max': 'Destination has a maximum length of 30' }),
  description: Joi.string()
    .allow('')
    .max(30)
    .messages({ 'string.max': 'Description has a maximum length of 30' }),
  categories: Joi.array()
    .items(Joi.string().hex().length(24))
    .required()
    .messages({
      'array.base': 'Category references should be strings',
      'any.required': 'Categories are required',
    }),
  status: Joi.string(),
});
