import { Router } from "express";
const router:Router = Router();
import asyncHandler from "../../middleware/asyncHandle";
import { isLoggedIn , canAccessBy } from "../../middleware/auth";
import TaskController from "./task.contoller";
import { PermissionEnum } from "../../common/enums/permission";

router.get('/', isLoggedIn , canAccessBy(PermissionEnum.CanGetTask ,PermissionEnum.CanViewTag), asyncHandler(TaskController.getAllTask));

router.put('/done/:id', isLoggedIn , canAccessBy(PermissionEnum.CanSetDoneTask), asyncHandler(TaskController.DoneTask));

router.delete('/:id', isLoggedIn , canAccessBy(PermissionEnum.CanDeleteTask), asyncHandler(TaskController.DeleteTask));

router.post('/', isLoggedIn , canAccessBy(PermissionEnum.CanCreateTask),  asyncHandler(TaskController.CreateTask));

router.put('/:id', isLoggedIn , canAccessBy(PermissionEnum.CanUpdateTask), asyncHandler(TaskController.UpdateTask));


export default router;


