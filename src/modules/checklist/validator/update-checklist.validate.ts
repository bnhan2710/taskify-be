import Joi from 'joi';
export const updateChecklistValidation = Joi.object({
    description: Joi.string().max(255).messages({
        'string.base': 'Description must be a string',
        'string.max': 'Description must be less than 255 characters',
    }),
    isDone: Joi.boolean().messages({
        'boolean.base': 'IsDone must be a boolean',
    }),
});