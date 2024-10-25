import { User } from "../../orm/entities/User";
import connection from "../../configs/database.connect";

import { Workspace } from "../../orm/entities/Workspace";
import { INewWorkSpace } from "./dto";

class WorkSpaceService{
    private workSpaceRepository = connection.getRepository(Workspace)
    private userRepository = connection.getRepository(User)

    public async NewWorkSpace(createWorkspaceDto : INewWorkSpace , ownerId : number) : Promise<void> { 
            const user = await this.userRepository.findOne({where:{id: ownerId}})
            
            if(user){
            await this.workSpaceRepository.save({
                name: createWorkspaceDto.name,
                description: createWorkspaceDto.description,
                user: user
            })   
        }    
    }
}

export default new WorkSpaceService