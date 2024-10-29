import Joi from 'joi'
export const newListValidation = Joi.object({
    name: Joi.string().max(255).required().messages({
        'string.base': 'Name must be a string',
        'any.required': 'Username is required'
    }),
    boardId: Joi.number().required().messages({
        'number.base': 'BoardId must be a number',
        'any.required': 'BoardId is required'
    })
});