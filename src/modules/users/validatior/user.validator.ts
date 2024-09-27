import Joi from 'joi'
import { Role } from '../../../common/enums/role'

export const createUserValidation = Joi.object({
    fullName: Joi.string().min(10).max(255),
    age: Joi.number().min(1).max(200),
    username: Joi.string().min(5).max(255).required(),
    email: Joi.string().email().required(),
    role: Joi.string().valid(Role.ADMIN, Role.USER).required(),
})

export const updateUserValidation = Joi.object({
    fullName: Joi.string().min(10).max(255),
    age: Joi.number().min(1).max(200),
    role: Joi.string().valid(Role.ADMIN, Role.USER),
})
