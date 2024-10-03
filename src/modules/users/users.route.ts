import { Router } from "express";
const router:Router = Router();
import validate from '../../middleware/validate';
import UserController from "./users.controller";
import asyncHandler from "../../middleware/asyncHandle";
import { updateUserValidation , createUserValidation } from "./validatior/user.validator";

router.get('/', asyncHandler(UserController.getAllUser));
router.get('/:id', asyncHandler(UserController.getUserById));
router.put('/:id',validate(updateUserValidation) , asyncHandler(UserController.updateUserById));
router.delete('/:id', asyncHandler(UserController.deleteUserById));

export default router;