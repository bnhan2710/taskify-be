import { Router } from "express";
const router = Router()
import asyncHandler from '../../middleware/asyncHandle';
import validate from '../../middleware/validate';
import AuthController from '../auth/auth.controller'
import { loginValidation, registerValidation } from "./validator/auth.validate";
import { checkAuth } from "../../middleware/checkAuth";
import passport from 'passport';
import { useGoogleStrategy } from './passport/googleStrategy';
import authController from "../auth/auth.controller";
useGoogleStrategy()
// LOGIN
router.post('/login', validate(loginValidation), asyncHandler(AuthController.login));
// REGISTER
router.post('/register', validate(registerValidation), asyncHandler(AuthController.register));
//REQUEST REFRESH TOKEN 
router.get('/refresh_token', asyncHandler(AuthController.refreshNewToken))
// GOOGLE LOGIN
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// GOOGLE CALLBACK
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), asyncHandler(AuthController.googleLogin));
// LOG OUT 
router.delete('/logout', checkAuth , asyncHandler(AuthController.logout))

export default router