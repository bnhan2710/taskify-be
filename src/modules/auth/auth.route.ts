import { Router } from 'express';
const router = Router();
import asyncHandler from '../../core/middleware/async-handler';
import validate from '../../core/middleware/validate';
import {
  changePasswordValidation,
  loginValidation,
  registerValidation,
} from './validator/auth.validate';
import { authenticate } from '../../core/middleware/authentication-middleware';
import passport from 'passport';
import { useGoogleStrategy } from './passport/googleStrategy';
import authController from '../auth/auth.controller';
useGoogleStrategy();
// LOGIN
router.post('/login', validate(loginValidation), asyncHandler(authController.login));
// REGISTER
router.post('/register', validate(registerValidation), asyncHandler(authController.register));
//REQUEST REFRESH TOKEN
router.get('/refresh_token', asyncHandler(authController.refreshNewToken));
// GOOGLE LOGIN
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// GOOGLE CALLBACK
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  asyncHandler(authController.googleLogin),
);
// LOG OUT
router.delete('/logout', authenticate, asyncHandler(authController.logout));
// CHANGE PASSWORD
router.put(
  '/change-password',
  authenticate,
  validate(changePasswordValidation),
  asyncHandler(authController.changePassword),
);

export default router;
