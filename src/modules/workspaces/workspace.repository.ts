import { Repository } from "typeorm";
import connection from "../../configs/database.connect";
import { Workspace } from "../../orm/entities/Workspace";
import { User } from "../../orm/entities/User";
import { INewWorkSpace, IUpdateWorkspace } from "./dto";
import { NotFoundError } from "../../handler/error.response";

class WorkspaceRepository {
    private readonly workSpaceRepository: Repository<Workspace>;
    private readonly userRepository: Repository<User>
    constructor() {
        this.workSpaceRepository = connection.getRepository(Workspace);
        this.userRepository = connection.getRepository(User)
    }
    public async newWorkspace(createWorkspaceDto: INewWorkSpace, ownerId: number): Promise<Workspace> {
        const owner = await this.userRepository.findOne({ where: { id: ownerId } });
        if (!owner) {
            throw new Error('User not found');
        }
    
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

   public async updateWorkspace(workspaceId: number, updateWorkspaceDto: IUpdateWorkspace): Promise<void> {
        await this.workSpaceRepository.update(
            { id: workspaceId },
            {
                name: updateWorkspaceDto.name,
                description: updateWorkspaceDto.description,
            }
        );
    }

    public async getMyWorkspaces(userId: number): Promise<[Workspace[], Workspace[]]> {
        const myWorkspaces = await this.workSpaceRepository.createQueryBuilder("workspace")
            .where("workspace.user_id = :userId", { userId })
            .getMany();

        const memberWorkspaces = await this.workSpaceRepository.createQueryBuilder("workspace")
            .innerJoin("workspace.users", "users")
            .where("users.id = :userId", { userId })
            .getMany();
        return [myWorkspaces, memberWorkspaces];
    }
}

export default new WorkspaceRepository();
