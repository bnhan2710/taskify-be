import Joi from 'joi'
export const updateListValidation = Joi.object({
    name: Joi.string().max(255).required().messages({
        'string.base': 'Name must be a string',
        'any.required': 'Username is required'
    }),
});