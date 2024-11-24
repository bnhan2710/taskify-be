import { Router } from "express";
const WorkspaceRoute:Router = Router()
import WorkspaceController from "./workspace.controller";
import { checkAuth } from "../../middleware/checkAuth";
import validate from "../../middleware/validate";
import { NewWorkspaceValidation,UpdateWorkspaceValidation } from "./validator/workspace.validate";
import asyncHandler from "../../middleware/asyncHandle";
import workspaceController from "./workspace.controller";

//CREATE WORKSPACE
WorkspaceRoute.post('/', checkAuth, validate(NewWorkspaceValidation), asyncHandler(WorkspaceController.newWorkspace))
//GET MY WORKSPACE 
WorkspaceRoute.get('/',checkAuth, asyncHandler(workspaceController.getMyworkpspace))
//GET WORKSPACE BY ID
WorkspaceRoute.get('/:id',checkAuth, asyncHandler(workspaceController.getWorkspaceById))
//UPDATE WORKSPACE
WorkspaceRoute.put('/:id/', checkAuth,validate(UpdateWorkspaceValidation), asyncHandler(workspaceController.updateWorkspace))
//ADD USER TO WORKSPACE
WorkspaceRoute.post('/:id/add' ,checkAuth, asyncHandler(workspaceController.addUser))
//REMOVE WORKSPACE
WorkspaceRoute.delete('/:id',checkAuth, asyncHandler(workspaceController.removeWorkspace))
export default WorkspaceRoute