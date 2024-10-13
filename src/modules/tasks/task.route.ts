import { Router } from "express";
const router:Router = Router();
import asyncHandler from "../../middleware/asyncHandle";
import { AuthToken } from "../../middleware/checkAuthToken";
import { canAccessBy } from "../../middleware/checkAccess";
import TaskController from "./task.contoller";

router.get('/', AuthToken , canAccessBy('GetTask' ,'ViewTag'), asyncHandler(TaskController.getAllTask));

router.put('/done/:id', AuthToken , canAccessBy('SetDoneTask'), asyncHandler(TaskController.DoneTask));

router.delete('/:id', AuthToken , canAccessBy('DeleteTask'), asyncHandler(TaskController.DeleteTask));

router.post('/', AuthToken , canAccessBy('CreateTask'),  asyncHandler(TaskController.CreateTask));

router.put('/:id', AuthToken , canAccessBy('UpdateTask'), asyncHandler(TaskController.UpdateTask));


export default router;


