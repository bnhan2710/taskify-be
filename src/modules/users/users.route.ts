import { Router } from "express";
const router:Router = Router();
import validate from "../../middleware/validation";
import UserController from "./users.controller";
import asyncHandler from "../../middleware/asyncHandle";
import { updateUserValidation , createUserValidation } from "./validatior/user.validator";

router.get('/', asyncHandler(UserController.getAllUser));
router.get('/:id', asyncHandler(UserController.getUserById));
router.post('/', validate(createUserValidation), asyncHandler(UserController.createUser));
router.put('/:id',validate(updateUserValidation) , asyncHandler(UserController.updateUser));
router.delete('/:id', asyncHandler(UserController.deleteUser));

export default router;