import { Workspace } from '../../database/entities/Workspace';
import { INewWorkSpace, IUpdateWorkspace } from './dto';
import { NotFoundError, ConflictRequestError } from '../../core/handler/error.response';
import WorkspaceRepository from './workspace.repository';
import UserRepository from '../user/user.repository';
class WorkSpaceService {
  public async newWorkspace(createWorkspaceDto: INewWorkSpace, ownerId: string): Promise<string> {
    const owner = await UserRepository.findOneById(ownerId);
    if (!owner) {
      throw new NotFoundError('User not found');
    }
    return await WorkspaceRepository.insert(createWorkspaceDto, ownerId);
  }

  public async getMyworkspace(userId: string): Promise<[Workspace[], Workspace[]]> {
    const workspaces = await WorkspaceRepository.getMy(userId);
    if (!workspaces) {
      throw new NotFoundError('Not found any workspace');
    }
    return workspaces;
  }

  public async getWorkspaceById(workspaceId: string): Promise<Workspace> {
    const workspace = await WorkspaceRepository.findbyId(workspaceId);
    if (!workspace) {
      throw new NotFoundError('Workspace not found');
    }
    return workspace;
  }

  public async updateWorkspace(
    updateWorkspaceDto: IUpdateWorkspace,
    workspaceId: string,
  ): Promise<void> {
    const workspace = await WorkspaceRepository.findbyId(workspaceId);
    if (!workspace) {
      throw new NotFoundError('Workspace not found');
    }
    await WorkspaceRepository.update(workspaceId, updateWorkspaceDto);
  }

  public async removeWorkspace(workspaceId: string): Promise<void> {
    const workspace = await WorkspaceRepository.findbyId(workspaceId);
    if (!workspace) {
      throw new NotFoundError('Workspace not found');
    }
    await WorkspaceRepository.remove(workspace);
  }
}

export default new WorkSpaceService();
