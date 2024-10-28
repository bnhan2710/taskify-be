import { Router } from "express";
const router:Router = Router()
import WorkspaceController from "./workspace.controller";
import { isLoggedIn } from "../../middleware/auth.middleware";
import validate from "../../middleware/validate";
import { NewWorkspaceValidation,UpdateWorkspaceValidation } from "./validator/workspace.validate";
import asyncHandler from "../../middleware/asyncHandle";
import workspaceController from "./workspace.controller";

//CREATE WORKSPACE
router.post('/', isLoggedIn, validate(NewWorkspaceValidation), asyncHandler(WorkspaceController.newWorkspace))
//UPDATE WORKSPACE
router.put('/:id', isLoggedIn,validate(UpdateWorkspaceValidation), asyncHandler(workspaceController.updateWorkspace))
//GET MY WORKSPACE 
router.get('/',isLoggedIn, asyncHandler(workspaceController.getMyworkpspace))
//ADD USER TO WORKSPACE
router.post('/:id/add' ,isLoggedIn, asyncHandler(workspaceController.addUser))

export default router