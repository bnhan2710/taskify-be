import Joi from 'joi';

export const commentSchema = Joi.object({
    text: Joi.string().required().messages({
        'string.base': `text should be a type of 'text'`,
        'string.empty': `text cannot be an empty field`,
        'any.required': `text is a required field`,
    }),
    cardId: Joi.number().required().messages({
        'number.base': `cardId should be a type of 'number'`,
        'number.empty': `cardId cannot be an empty field`,
        'any.required': `cardId is a required field`,
    }),
});

export const commentUpdateSchema = Joi.object({
    text: Joi.string().required().messages({
        'string.base': `text should be a type of 'text'`,
        'string.empty': `text cannot be an empty field`,
        'any.required': `text is a required field`,
    }),
});