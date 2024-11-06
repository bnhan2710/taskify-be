import Joi from "joi";
export const createChecklistValidation = Joi.object({
    description: Joi.string().max(255).messages({
        "string.base": "Description must be a string",
        "string.max": "Description must be less than 255 characters",
    }),
    cardId: Joi.number().required().messages({
        "number.base": "ListId must be a number",
        "any.required": "ListId is required",
    }),
});