import Joi from 'joi';
export const updateListValidation = Joi.object({
  title: Joi.string().messages({
    'string.base': 'Title must be a string',
    'any.required': 'Title is required',
  }),
  cardOrderIds: Joi.array().messages({
    'array.base': 'CardOrderIds must be an array',
  }),
});
