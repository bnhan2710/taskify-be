import { Router } from 'express';
const router: Router = Router();
import validate from '../../core/middleware/validate';
import UserController from './users.controller';
import asyncHandler from '../../core/middleware/async-handler';
import { authenticate } from '../../core/middleware/authentication-middleware';
import { updateUserValidation } from './validator/user.validator';

//GET ALL USERS
router.get('/', authenticate, asyncHandler(UserController.getAllUser));
//GET USER BY ID
router.get('/:id', authenticate, asyncHandler(UserController.getUserById));
//UPDATE USER
router.put(
  '/:id',
  authenticate,
  validate(updateUserValidation),
  asyncHandler(UserController.updateUserById),
);
//REMOVE USER
router.delete('/:id', authenticate, asyncHandler(UserController.deleteUserById));

export default router;
