import { NextFunction, Request , Response } from "express";
import WorkspaceService from "./workspace.service";
import { NewWorkspaceDTO , UpdateWorkspaceDTO } from "./dto";
import { OK ,CREATED } from "../../handler/success.reponse";
import { Workspace } from '../../orm/entities/Workspace';
class WorkspaceController{ 
    public async newWorkspace(req: Request, res: Response , next: NextFunction): Promise<void> {
        const newWorkSpaceDto = NewWorkspaceDTO(req.body)
        const ownerId = req.user.id
        await WorkspaceService.newWorkspace(newWorkSpaceDto, ownerId)
        new CREATED({
            message: 'Create Workspace successfully',
        }).send(res)
    }

    public async updateWorkspace(req:Request, res: Response, next: NextFunction): Promise<void> {
        const updateWorkspaceDto = UpdateWorkspaceDTO(req.body)
        const workspaceId = parseInt(req.params.id)
        await WorkspaceService.updateWorkspace(updateWorkspaceDto, workspaceId)
        new OK({
            message:'Update Workspace succesfully'
        }).send(res)
    }
    
    public async addUser(req:Request, res: Response, next: NextFunction){
        const userId = parseInt(req.body.userId)
        const workspaceId= parseInt(req.params.id)
        await WorkspaceService.addUser( userId, workspaceId)
        new OK({
            message: 'Add user to workspace succesfully'
        }).send(res)    
    }
    
    public async getMyworkpspace(req:Request, res: Response, next: NextFunction): Promise<void> {
        const userId = parseInt(req.user.id)
        new OK({
            message: 'Get workspace successfully',
            data: await WorkspaceService.getMyworkspace(userId)
        }).send(res)
    }

}

export default new WorkspaceController