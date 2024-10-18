import { Router } from "express";
const router:Router = Router();
import asyncHandler from "../../middleware/asyncHandle";
import { isLoggedIn , canAccessBy } from "../../middleware/auth";
import TaskController from "./task.contoller";
import { Permission } from "../../common/enums/permission";

router.get('/', isLoggedIn , canAccessBy(Permission.CanGetTask ,Permission.CanViewTag), asyncHandler(TaskController.getAllTask));

router.put('/done/:id', isLoggedIn , canAccessBy(Permission.CanSetDoneTask), asyncHandler(TaskController.DoneTask));

router.delete('/:id', isLoggedIn , canAccessBy(Permission.CanDeleteTask), asyncHandler(TaskController.DeleteTask));

router.post('/', isLoggedIn , canAccessBy(Permission.CanCreateTask),  asyncHandler(TaskController.CreateTask));

router.put('/:id', isLoggedIn , canAccessBy(Permission.CanUpdateTask), asyncHandler(TaskController.UpdateTask));


export default router;


