import Joi from "joi";
export const createCardValidation = Joi.object({
    title: Joi.string().max(255).required().messages({
        "string.base": "Name must be a string",
        "any.required": "Name is required",
    }),
    listId: Joi.number().required().messages({
        "number.base": "ListId must be a number",
        "any.required": "ListId is required",
    }),
});