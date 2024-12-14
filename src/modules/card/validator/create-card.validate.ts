import Joi from "joi";
export const createCardValidation = Joi.object({
    title: Joi.string().max(255).required().messages({
        "string.base": "Title must be a string",
        "any.required": "Title is required",
    }),
    listId: Joi.string().required().messages({
        "string.base": "ListId must be a string",
        "any.required": "ListId is required",
    }),
});