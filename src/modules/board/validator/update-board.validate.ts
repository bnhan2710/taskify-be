import Joi from 'joi';
export const updateBoardValidation = Joi.object({
  title: Joi.string().max(255).messages({
    'string.base': 'Name must be a string',
    'any.required': 'Username is required',
  }),
  description: Joi.string().max(255).messages({
    'string.base': 'Description must be a string',
  }),
  listOrderIds: Joi.array().items(Joi.string()).messages({
    'array.base': 'List order ids must be an array',
  }),
});
