import { Router } from "express";
const router:Router = Router();
import validate from '../../middleware/validate';
import UserController from "./users.controller";
import asyncHandler from "../../middleware/asyncHandle";
import { updateUserValidation } from "./validatior/user.validator";

//GET ALL USERS
router.get('/', asyncHandler(UserController.getAllUser));
//GET USER BY ID
router.get('/:id', asyncHandler(UserController.getUserById));
//UPDATE USER
router.put('/:id',validate(updateUserValidation) , asyncHandler(UserController.updateUserById));
//REMOVE USER
router.delete('/:id', asyncHandler(UserController.deleteUserById));

export default router;


