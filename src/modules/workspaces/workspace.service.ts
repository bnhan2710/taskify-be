import connection from "../../configs/database.connect";
import { Workspace } from "../../orm/entities/Workspace";
import { INewWorkSpace, IUpdateWorkspace } from "./dto";
import { NotFoundError } from "../../handler/error.response";
import WorkspaceRepository from "./workspace.repository";
class WorkSpaceService{

    public async newWorkspace(createWorkspaceDto: INewWorkSpace, ownerId:number): Promise<Workspace> {
        return await WorkspaceRepository.newWorkspace(createWorkspaceDto, ownerId);
    }

    public async updateWorkspace(updateWorkspaceDto: IUpdateWorkspace, workspaceId: number): Promise<void> {
        const workspace = await WorkspaceRepository.findWorkspaceById(workspaceId);
        if (!workspace) {
            throw new NotFoundError("Workspace not found");
        }
        await WorkspaceRepository.updateWorkspace(workspaceId, updateWorkspaceDto);
    }
    
    public async getMyworkspace(userId:number):Promise<any> {
        const workspaces = await WorkspaceRepository.getMyWorkspaces(userId)
        if(!workspaces){
            throw new NotFoundError('Not found any workspace')
        }
        return workspaces
    }   

}

export default new WorkSpaceService