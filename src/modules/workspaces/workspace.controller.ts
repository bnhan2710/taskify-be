import { NextFunction, Request , Response } from "express";
import WorkspaceService from "./workspace.service";
import { NewWorkspaceDTO } from "./dto/create-workspace.dto";
import { OK } from "../../handler/success.reponse";
class WorkspaceController{ 
    public async NewWorkSpace(req: Request, res: Response , next: NextFunction): Promise<void> {
        const newWorkSpaceDto = NewWorkspaceDTO(req.body)
        const ownerId = req.user.id
        await WorkspaceService.NewWorkSpace(newWorkSpaceDto, ownerId)
        new OK({
            message: 'Create Workspace successfully',
        }).send(res)
    }
}

export default new WorkspaceController