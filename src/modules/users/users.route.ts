import { Router } from "express";
const router:Router = Router();
import validate from '../../middleware/validate';
import UserController from "./users.controller";
import asyncHandler from "../../middleware/asyncHandle";
import { isLoggedIn, canAccessBy } from "../../middleware/auth.middleware";
import { updateUserValidation } from "./validatior/user.validator";
import { PermissionEnum } from "../../common/enums/permission";

//GET ALL USERS
router.get('/', isLoggedIn , canAccessBy(PermissionEnum.CanGetAllUser,PermissionEnum.Test), asyncHandler(UserController.getAllUser));
//GET USER BY ID
router.get('/:id', isLoggedIn ,canAccessBy(PermissionEnum.CanGetOneUser) , asyncHandler(UserController.getUserById));
//UPDATE USER
router.put('/:id', isLoggedIn ,canAccessBy(PermissionEnum.CanUpdateUser) ,validate(updateUserValidation) , asyncHandler(UserController.updateUserById));
//REMOVE USER
router.delete('/:id', isLoggedIn , canAccessBy(PermissionEnum.CanDeleteUser) , asyncHandler(UserController.deleteUserById));

export default router;


