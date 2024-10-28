import { Workspace } from "../../orm/entities/Workspace";
import { INewWorkSpace, IUpdateWorkspace } from "./dto";
import { NotFoundError,ConflictRequestError } from "../../handler/error.response";
import WorkspaceRepository from "./workspace.repository";
import UserRepository from "../users/user.repository";
class WorkSpaceService{

    public async newWorkspace(createWorkspaceDto: INewWorkSpace, ownerId:number): Promise<Workspace> {
        const owner = await UserRepository.findOneById(ownerId);
        if (!owner) {
            throw new NotFoundError("User not found");
        }
        return await WorkspaceRepository.newWorkspace(createWorkspaceDto, owner);
    }

    public async updateWorkspace(updateWorkspaceDto: IUpdateWorkspace, workspaceId: number): Promise<void> {
        const workspace = await WorkspaceRepository.findWorkspaceById(workspaceId);
        if (!workspace) {
            throw new NotFoundError("Workspace not found");
        }
        await WorkspaceRepository.updateWorkspace(workspaceId, updateWorkspaceDto);
    }

    public async addUser(userId: number, workspaceId: number){
        const user = await UserRepository.findOneById(userId)
        if(!user){
            throw new NotFoundError('User not found')
        }
        const workspace = await WorkspaceRepository.findWorkspaceUsers(workspaceId)
        if(!workspace){
            throw new NotFoundError('Workspace not found')
        }
        if(workspace.users.find(u => u.id === userId)){
            throw new ConflictRequestError('User already in this workspace')
        }
        
        await WorkspaceRepository.addUser(workspace, user)
    }
    
    public async getMyworkspace(userId:number):Promise<[Workspace[],Workspace[]]> {
        const workspaces = await WorkspaceRepository.getMyWorkspaces(userId)
        if(!workspaces){
            throw new NotFoundError('Not found any workspace')
        }
        return workspaces
    }   

}

export default new WorkSpaceService