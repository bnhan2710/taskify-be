import { Router } from "express";
const router = Router()
import asyncHandler from '../../middleware/asyncHandle';
import validate from '../../middleware/validate';
import AuthController from '../auth/auth.controller'
import { loginValidation, registerValidation } from "./vallidator/auth.validate";

// LOGIN
router.post('/login', validate(loginValidation), asyncHandler(AuthController.login));
// REGISTER
router.post('/register', validate(registerValidation), asyncHandler(AuthController.register));

export default router