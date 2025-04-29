import { Router } from 'express';
const WorkspaceRoute: Router = Router();
import WorkspaceController from './workspace.controller';
import { authenticate } from '../../core/middleware/authentication-middleware';
import validate from '../../core/middleware/validate';
import { NewWorkspaceValidation, UpdateWorkspaceValidation } from './validator/workspace.validate';
import asyncHandler from '../../core/middleware/async-handler';
import workspaceController from './workspace.controller';

//CREATE WORKSPACE
WorkspaceRoute.post(
  '/',
  authenticate,
  validate(NewWorkspaceValidation),
  asyncHandler(WorkspaceController.newWorkspace),
);
//GET MY WORKSPACE
WorkspaceRoute.get('/', authenticate, asyncHandler(workspaceController.getMyworkpspace));
//GET WORKSPACE BY ID
WorkspaceRoute.get('/:id', authenticate, asyncHandler(workspaceController.getWorkspaceById));
//UPDATE WORKSPACE
WorkspaceRoute.put(
  '/:id/',
  authenticate,
  validate(UpdateWorkspaceValidation),
  asyncHandler(workspaceController.updateWorkspace),
);
//REMOVE WORKSPACE
WorkspaceRoute.delete('/:id', authenticate, asyncHandler(workspaceController.removeWorkspace));
export default WorkspaceRoute;
