import Joi from 'joi';
export const NewWorkspaceValidation = Joi.object({
  name: Joi.string().max(255).required().messages({
    'string.base': 'Name must be a string',
    'any.required': 'Username is required',
  }),
  description: Joi.string().max(255).messages({
    'string.base': 'Description must be a string',
    'string.max': 'Description must be at most 255 characters',
  }),
});

export const UpdateWorkspaceValidation = Joi.object({
  name: Joi.string().max(255).required().messages({
    'string.base': 'Name must be a string',
    'any.required': 'Username is required',
  }),
  description: Joi.string().max(255).messages({
    'string.base': 'Description must be a string',
    'string.max': 'Description must be at most 255 characters',
  }),
});
