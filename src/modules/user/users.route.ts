import { Router } from "express";
const router:Router = Router();
import validate from '../../middleware/validate';
import UserController from "./users.controller";
import asyncHandler from "../../middleware/asyncHandle";
import { isLoggedIn, checkPermission } from "../../middleware/auth.middleware";
import { updateUserValidation } from "./validator/user.validator";
import { PermissionEnum } from "../../common/enums/permission";

//GET ALL USERS
router.get('/', isLoggedIn , asyncHandler(UserController.getAllUser));
//GET USER BY ID
router.get('/:id', isLoggedIn , asyncHandler(UserController.getUserById));
//UPDATE USER
router.put('/:id', isLoggedIn ,validate(updateUserValidation) , asyncHandler(UserController.updateUserById));
//REMOVE USER
router.delete('/:id', isLoggedIn , asyncHandler(UserController.deleteUserById));

export default router;
