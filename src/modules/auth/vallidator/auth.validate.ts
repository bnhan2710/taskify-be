import Joi from 'joi'

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
    fullName: Joi.string().min(10).max(255).messages({
        'string.min': 'Fullname must be at least 10 characters',
    }),
    age: Joi.number().min(1).max(200).messages({
        'number.min': 'Age must be at least 1',
        'number.max': 'Age must be at most 200',
    }),
});
