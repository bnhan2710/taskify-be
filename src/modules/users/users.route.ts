import { Router } from "express";
const router:Router = Router();
import validate from '../../middleware/validate';
import UserController from "./users.controller";
import asyncHandler from "../../middleware/asyncHandle";
import { isLoggedIn, canAccessBy } from "../../middleware/auth";
import { updateUserValidation } from "./validatior/user.validator";
import { Permission } from "../../common/enums/permission";

//GET ALL USERS
router.get('/', isLoggedIn , canAccessBy(Permission.CanGetAllUser,Permission.Test), asyncHandler(UserController.getAllUser));
//GET USER BY ID
router.get('/:id', isLoggedIn ,canAccessBy(Permission.CanGetOneUser) , asyncHandler(UserController.getUserById));
//UPDATE USER
router.put('/:id', isLoggedIn ,canAccessBy(Permission.CanUpdateUser) ,validate(updateUserValidation) , asyncHandler(UserController.updateUserById));
//REMOVE USER
router.delete('/:id', isLoggedIn , canAccessBy(Permission.CanDeleteUser) , asyncHandler(UserController.deleteUserById));

export default router;


