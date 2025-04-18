import Joi from 'joi';
export const updateCardValidation = Joi.object({
  title: Joi.string().max(255).messages({
    'string.base': 'Titile must be a string',
  }),
  description: Joi.string().min(1).max(255).messages({
    'string.base': 'Description must be a string',
  }),
  listId: Joi.string().messages({
    'string.base': 'ListId must be a string',
  }),
});
