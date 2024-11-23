import Joi from 'joi'
export const newListValidation = Joi.object({
    title: Joi.string().required().messages({
        'string.base': 'Title must be a string',
        'any.required': 'Title is required'
    }),
    boardId: Joi.string().required().messages({
        'string.base': 'BoardId must be a string',
        'any.required': 'BoardId is required'
    })
});