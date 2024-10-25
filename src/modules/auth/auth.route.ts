import { Router } from "express";
const router = Router()
import asyncHandler from '../../middleware/asyncHandle';
import validate from '../../middleware/validate';
import AuthController from '../auth/auth.controller'
import { loginValidation, registerValidation } from "./validator/auth.validate";
import { isLoggedIn } from "../../middleware/auth.middleware";
// LOGIN
router.post('/login', validate(loginValidation), asyncHandler(AuthController.login));
// REGISTER
router.post('/register', validate(registerValidation), asyncHandler(AuthController.register));
// LOG OUT 
router.post('/logout', isLoggedIn , asyncHandler(AuthController.logout))

export default router