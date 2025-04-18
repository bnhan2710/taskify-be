import Joi from 'joi';
export const NewBoardValidation = Joi.object({
  title: Joi.string().max(255).required().messages({
    'string.base': 'Name must be a string',
    'any.required': 'Username is required',
  }),
  description: Joi.string().max(255).messages({
    'string.base': 'Description must be a string',
  }),
  type: Joi.string().required().messages({
    'string.base': 'Type must be a string',
    'any.required': 'Type is required',
  }),
  workspaceId: Joi.string().required().messages({
    'string.base': 'WorkspaceId must be a string',
    'any.required': 'WorkspaceId is required',
  }),
});
