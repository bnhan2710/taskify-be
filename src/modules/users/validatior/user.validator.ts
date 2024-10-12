import Joi from 'joi'
export const updateUserValidation = Joi.object({
    fullName: Joi.string().min(10).max(255),
    age: Joi.number().min(1).max(200),
})


