import Joi from 'joi'
export const updateBoardValidation = Joi.object({
    name: Joi.string().max(255).messages({
        'string.base': 'Name must be a string',
        'any.required': 'Username is required'
    }),
    description: Joi.string().max(255).messages({
        'string.base': 'Description must be a string',
    })
});