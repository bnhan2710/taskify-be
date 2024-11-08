import { Router } from "express";
const WorkspaceRoute:Router = Router()
import WorkspaceController from "./workspace.controller";
import { isLoggedIn } from "../../middleware/auth.middleware";
import validate from "../../middleware/validate";
import { NewWorkspaceValidation,UpdateWorkspaceValidation } from "./validator/workspace.validate";
import asyncHandler from "../../middleware/asyncHandle";
import workspaceController from "./workspace.controller";

//CREATE WORKSPACE
WorkspaceRoute.post('/', isLoggedIn, validate(NewWorkspaceValidation), asyncHandler(WorkspaceController.newWorkspace))
//GET MY WORKSPACE 
WorkspaceRoute.get('/',isLoggedIn, asyncHandler(workspaceController.getMyworkpspace))
//GET WORKSPACE BY ID
WorkspaceRoute.get('/:id',isLoggedIn, asyncHandler(workspaceController.getWorkspaceById))
//UPDATE WORKSPACE
WorkspaceRoute.put('/:id/', isLoggedIn,validate(UpdateWorkspaceValidation), asyncHandler(workspaceController.updateWorkspace))
//ADD USER TO WORKSPACE
WorkspaceRoute.post('/:id/add' ,isLoggedIn, asyncHandler(workspaceController.addUser))
//REMOVE WORKSPACE
WorkspaceRoute.delete('/:id',isLoggedIn, asyncHandler(workspaceController.removeWorkspace))
export default WorkspaceRoute