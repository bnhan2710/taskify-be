import Joi from 'joi'
export const NewBoardValidation = Joi.object({
    name: Joi.string().max(255).required().messages({
        'string.base': 'Name must be a string',
        'any.required': 'Username is required'
    }),
    workspaceId: Joi.number().required().messages({
        'number.base': 'WorkspaceId must be a number',
        'any.required': 'WorkspaceId is required'
    })
});

