import { Repository } from "typeorm";
import connection from "../../configs/database.connect";
import { Workspace } from "../../orm/entities/Workspace";
import { User } from "../../orm/entities/User";
import { INewWorkSpace, IUpdateWorkspace } from "./dto";
import { NotFoundError } from "../../handler/error.response";
import userRepository from "../users/user.repository";

class WorkspaceRepository {
    private readonly workSpaceRepository: Repository<Workspace>;
    constructor() {
        this.workSpaceRepository = connection.getRepository(Workspace);
    }
    public async newWorkspace(createWorkspaceDto: INewWorkSpace, owner: User): Promise<Workspace> {
        const newWorkspace = this.workSpaceRepository.create({
            name: createWorkspaceDto.name,
            description: createWorkspaceDto.description,
            owner,
        });

        return await this.workSpaceRepository.save(newWorkspace);
    }

    public async findWorkspaceById(workspaceId: number): Promise<Workspace | null> {
        return await this.workSpaceRepository.findOne({ where: { id: workspaceId } });
    }

    public async findWorkspaceUsers(workspaceId: number): Promise<Workspace> {
        const workspace = await this.workSpaceRepository.findOne({ where: { id: workspaceId }, relations: ["users"] });
        if (!workspace) {
            throw new NotFoundError("Workspace not found");
        }
        return workspace;
    }

   public async updateWorkspace(workspaceId: number, updateWorkspaceDto: IUpdateWorkspace): Promise<void> {
        await this.workSpaceRepository.update(
            { id: workspaceId },
            {
                name: updateWorkspaceDto.name,
                description: updateWorkspaceDto.description,
            }
        );
    }

    public async addUser(workspace: Workspace, user: User):Promise<void> {
        workspace.users.push(user);
        await this.workSpaceRepository.save(workspace);
    }

    public async getMyWorkspaces(userId: number): Promise<[Workspace[], Workspace[]]> {
        const myWorkspaces = await this.workSpaceRepository.find({
            where: { owner: { id: userId } },
        });
        
        const memberWorkspaces = await this.workSpaceRepository.find({
            where: {
                users: { id: userId },
            },
        });
        return [myWorkspaces, memberWorkspaces];
    }
}

export default new WorkspaceRepository();
