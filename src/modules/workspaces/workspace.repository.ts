import { Repository } from "typeorm";
import connection from "../../configs/database.connect";
import { Workspace } from "../../orm/entities/Workspace";
import { User } from "../../orm/entities/User";
import { INewWorkSpace, IUpdateWorkspace } from "./dto";
import { NotFoundError } from "../../handler/error.response";

class WorkspaceRepository {
    private readonly repository: Repository<Workspace>;
    constructor() {
        this.repository = connection.getRepository(Workspace);
    }
    public async insert(createWorkspaceDto: INewWorkSpace, owner: User): Promise<Workspace> {
        const newWorkspace = this.repository.create({
            name: createWorkspaceDto.name,
            description: createWorkspaceDto.description,
            owner,
        });

        return await this.repository.save(newWorkspace);
    }

    public async findbyId(workspaceId: string): Promise<Workspace | null> {
        return await this.repository.findOne({ where: { id: workspaceId } });
    }

    public async findWorkspaceUsers(workspaceId: string): Promise<Workspace> {
        const workspace = await this.repository.findOne({ where: { id: workspaceId }, relations: ["users"] });
        if (!workspace) {
            throw new NotFoundError("Workspace not found");
        }
        return workspace;
    }

   public async update(workspaceId: string, updateWorkspaceDto: IUpdateWorkspace): Promise<void> {
        await this.repository.update(
            { id: workspaceId } ,
            {
                name: updateWorkspaceDto.name,
                description: updateWorkspaceDto.description,
            }
        );
    }

    public async addUser(workspace: Workspace, user: User):Promise<void> {
        workspace.users.push(user);
        await this.repository.save(workspace);
    }

    public async getMy(userId: string): Promise<[Workspace[], Workspace[]]> {
        const myWorkspaces = await this.repository.find({
            where: { owner: { id: userId } },
        });
        
        const memberWorkspaces = await this.repository.find({
            where: {
                users: { id: userId },
            },
        });
        return [myWorkspaces, memberWorkspaces];
    }

    public async remove(workspace: Workspace): Promise<void> {
        await this.repository.remove(workspace);
    }
}

export default new WorkspaceRepository();
