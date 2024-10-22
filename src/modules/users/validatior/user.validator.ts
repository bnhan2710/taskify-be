import Joi from 'joi'
import { Gender } from '../../../common/enums/gender';

export const updateUserValidation = Joi.object({
    fullName: Joi.string().min(10).max(255).messages({
        'string.min': 'Fullname must be at least 10 characters',
    }),
    age: Joi.number().min(1).max(200).messages({
        'number.min': 'Age must be at least 1',
        'number.max': 'Age must be at most 200',
    }),
    gender: Joi.string().valid(...Object.values(Gender)).messages({
        'any.only': 'Gender must be one of the allowed values',
    }),
    avatar: Joi.string().uri().messages({
        'string.uri': 'Avatar must be a valid url',
    })
})


