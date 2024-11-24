import { Workspace } from "../../orm/entities/Workspace";
import { INewWorkSpace, IUpdateWorkspace } from "./dto";
import { NotFoundError,ConflictRequestError } from "../../handler/error.response";
import WorkspaceRepository from "./workspace.repository";
import UserRepository from "../user/user.repository";
class WorkSpaceService{

    public async newWorkspace(createWorkspaceDto: INewWorkSpace, ownerId:string): Promise<string> {
        const owner = await UserRepository.findOneById(ownerId);
        if (!owner) {
            throw new NotFoundError("User not found");
        }
        return await WorkspaceRepository.insert(createWorkspaceDto, owner);
    }

    public async getMyworkspace(userId:string):Promise<[Workspace[],Workspace[]]> {
        const workspaces = await WorkspaceRepository.getMy(userId)
        if(!workspaces){
            throw new NotFoundError('Not found any workspace')
        }
        return workspaces
    }   

    public async getWorkspaceById(workspaceId: string): Promise<Workspace> {
        const workspace = await WorkspaceRepository.findbyId(workspaceId);
        if (!workspace) {
            throw new NotFoundError("Workspace not found");
        }
        return workspace;
    }

    public async updateWorkspace(updateWorkspaceDto: IUpdateWorkspace, workspaceId: string): Promise<void> {
        const workspace = await WorkspaceRepository.findbyId(workspaceId);
        if (!workspace) {
            throw new NotFoundError("Workspace not found");
        }
        await WorkspaceRepository.update(workspaceId, updateWorkspaceDto);
    }
    

    public async addUser(userId: string, workspaceId: string){
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
    
    public async removeWorkspace(workspaceId: string): Promise<void> {
        const workspace = await WorkspaceRepository.findbyId(workspaceId);
        if (!workspace) {
            throw new NotFoundError("Workspace not found");
        }
        await WorkspaceRepository.remove(workspace);
    }
}

export default new WorkSpaceService