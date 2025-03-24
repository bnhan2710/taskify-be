import Joi from 'joi';
import { 
  EMAIL_RULE, 
  EMAIL_RULE_MESSAGE, 
  PASSWORD_RULE, 
  PASSWORD_RULE_MESSAGE
} from '../../../shared/utils/validator.util';

export const loginValidation = Joi.object({
  email: Joi.string().pattern(EMAIL_RULE).required().messages({
    'string.pattern.base': EMAIL_RULE_MESSAGE,
    'any.required': 'Email is required',
  }),
  password: Joi.string().pattern(PASSWORD_RULE).required().messages({
    'string.pattern.base': PASSWORD_RULE_MESSAGE,
    'any.required': 'Password is required',
  }),
});

export const registerValidation = Joi.object({
  username: Joi.string().min(1).max(255).required().messages({
    'string.base': 'Username must be a string',
    'string.min': 'Username must be at least 1 characters',
    'string.max': 'Username must be less than 256 characters',
    'any.required': 'Username is required',
  }),
  password: Joi.string().pattern(PASSWORD_RULE).required().messages({
    'string.pattern.base': PASSWORD_RULE_MESSAGE,
    'any.required': 'Password is required',
  }),
  email: Joi.string().pattern(EMAIL_RULE).required().messages({
    'string.pattern.base': EMAIL_RULE_MESSAGE,
    'any.required': 'Email is required',
  }),
});
