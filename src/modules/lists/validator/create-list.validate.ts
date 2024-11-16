import Joi from 'joi'
export const newListValidation = Joi.object({
    title: Joi.string().required().messages({
        'string.base': 'Title must be a string',
        'any.required': 'Title is required'
    }),
    boardId: Joi.number().required().messages({
        'number.base': 'BoardId must be a number',
        'any.required': 'BoardId is required'
    })
});