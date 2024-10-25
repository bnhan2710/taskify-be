import Joi from 'joi'
import { Gender } from '../../../common/enums/gender';
export const loginValidation = Joi.object({
    username: Joi.string().min(3).max(255).required().messages({
        'string.base': 'Username must be a string',
        'string.min': 'Username must be at least 3 characters',
        'any.required': 'Username is required',
    }),
    password: Joi.string().min(5).max(255).required().messages({
        'string.min': 'Password must be at least 5 characters',
        'any.required': 'Password is required',
    }),
});

export const registerValidation = Joi.object({
    username: Joi.string().min(3).max(255).required().messages({
        'string.base': 'Username must be a string',
        'string.min': 'Username must be at least 3 characters',
        'any.required': 'Username is required',
    }),
    password: Joi.string().min(5).max(255).required().messages({
        'string.min': 'Password must be at least 5 characters',
        'any.required': 'Password is required',
    }),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
        'string.email': 'Email is invalid',
        'any.required': 'Email is required',
    }),
});
