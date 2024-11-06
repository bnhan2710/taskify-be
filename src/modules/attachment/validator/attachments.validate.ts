import Joi from "joi";

export const attachmentValidation = Joi.object({
    size: Joi.number().max(10485760).required().messages({
      'number.max': 'File size must not exceed 10MB',
    }),
  });