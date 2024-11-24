import { Router } from "express";
const router:Router = Router();
import validate from '../../middleware/validate';
import UserController from "./users.controller";
import asyncHandler from "../../middleware/asyncHandle";
import { checkAuth } from "../../middleware/checkAuth";
import { updateUserValidation } from "./validator/user.validator";

//GET ALL USERS
router.get('/', checkAuth , asyncHandler(UserController.getAllUser));
//GET USER BY ID
router.get('/:id', checkAuth , asyncHandler(UserController.getUserById));
//UPDATE USER
router.put('/:id', checkAuth ,validate(updateUserValidation) , asyncHandler(UserController.updateUserById));
//REMOVE USER
router.delete('/:id', checkAuth , asyncHandler(UserController.deleteUserById));

export default router;
