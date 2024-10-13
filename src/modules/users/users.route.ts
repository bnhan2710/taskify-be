import { Router } from "express";
const router:Router = Router();
import validate from '../../middleware/validate';
import UserController from "./users.controller";
import asyncHandler from "../../middleware/asyncHandle";
import { AuthToken } from "../../middleware/checkAuthToken";
import { canAccessBy } from "../../middleware/checkAccess";

import { updateUserValidation } from "./validatior/user.validator";

//GET ALL USERS
router.get('/', AuthToken , canAccessBy('GetAllUser'), asyncHandler(UserController.getAllUser));
//GET USER BY ID
router.get('/:id', canAccessBy('GetOneUser') , asyncHandler(UserController.getUserById));
//UPDATE USER
router.put('/:id', canAccessBy('CanUpdateUser') ,validate(updateUserValidation) , asyncHandler(UserController.updateUserById));
//REMOVE USER
router.delete('/:id',canAccessBy('CanDeleteUser') , asyncHandler(UserController.deleteUserById));

export default router;


