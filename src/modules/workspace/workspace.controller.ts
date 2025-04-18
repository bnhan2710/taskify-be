import { NextFunction, Request, Response } from 'express';
import WorkspaceService from './workspace.service';
import { NewWorkspaceDTO, UpdateWorkspaceDTO } from './dto';
import { OK, CREATED } from '../../core/handler/success.reponse';
import { Workspace } from '../../database/entities/Workspace';
class WorkspaceController {
  public async newWorkspace(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const newWorkSpaceDto = NewWorkspaceDTO(req.body);
    const ownerId = req.userJwt.id;
    const workspaceId = await WorkspaceService.newWorkspace(newWorkSpaceDto, ownerId);
    new CREATED({
      message: 'Create Workspace successfully',
      data: workspaceId,
    }).send(res);
  }

  public async updateWorkspace(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const updateWorkspaceDto = UpdateWorkspaceDTO(req.body);
    const workspaceId = req.params.id;
    await WorkspaceService.updateWorkspace(updateWorkspaceDto, workspaceId);
    new OK({
      message: 'Update Workspace succesfully',
    }).send(res);
  }

  public async getMyworkpspace(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const userId = req.userJwt.id;
    new OK({
      message: 'Get workspace successfully',
      data: await WorkspaceService.getMyworkspace(userId),
    }).send(res);
  }

  public async getWorkspaceById(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const workspaceId = req.params.id;
    new OK({
      message: 'Get workspace successfully',
      data: await WorkspaceService.getWorkspaceById(workspaceId),
    }).send(res);
  }

  public async removeWorkspace(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const workspaceId = req.params.id;
    await WorkspaceService.removeWorkspace(workspaceId);
    new OK({
      message: 'Remove workspace successfully',
    }).send(res);
  }
}

export default new WorkspaceController();
