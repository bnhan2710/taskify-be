import Joi from 'joi'
export const updateListValidation = Joi.object({
    name: Joi.string().max(255).messages({
        'string.base': 'Name must be a string',
    }),
});