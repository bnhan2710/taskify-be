import Joi from "joi";
export const updateCardValidation = Joi.object({
    title: Joi.string().max(255).messages({
        "string.base": "Name must be a string",
        "any.required": "Name is required",
    }),
    description: Joi.string().min(1).max(255).messages({
        "string.base": "Description must be a string",
    }),
    listId: Joi.number().required().messages({
        "number.base": "ListId must be a number",
        "any.required": "ListId is required",
    }),
});