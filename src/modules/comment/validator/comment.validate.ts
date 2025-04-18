import Joi from 'joi';

export const commentSchema = Joi.object({
  content: Joi.string().required().messages({
    'string.base': `content should be a type of 'text'`,
    'string.empty': `content cannot be an empty field`,
    'any.required': `content is a required field`,
  }),
  cardId: Joi.string().required().messages({
    'string.base': `cardId should be a type string'`,
    'string.empty': `cardId cannot be an empty field`,
    'any.required': `cardId is a required field`,
  }),
  userId: Joi.string().required().messages({
    'string.base': `userId should be a type string'`,
    'string.empty': `userId cannot be an empty field`,
    'any.required': `userId is a required field`,
  }),
});

export const commentUpdateSchema = Joi.object({
  content: Joi.string().required().messages({
    'string.base': `content should be a type of 'text'`,
    'string.empty': `content cannot be an empty field`,
    'any.required': `content is a required field`,
  }),
});
