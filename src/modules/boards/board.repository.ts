import { Repository } from "typeorm";
import { Board } from "../../orm/entities/Board";
import { Workspace } from "../../orm/entities/Workspace";
import connection from "../../configs/database.connect";
import { INewBoard, IUpdateBoard } from "./dto";
import { UpdateWorkspaceDTO } from '../workspaces/dto/update-workspace.dto';

class BoardRepository{
    private readonly boardRepository: Repository<Board>
    private readonly workspaceRepository: Repository<Workspace>
    constructor(){
        this.boardRepository = connection.getRepository(Board)
        this.workspaceRepository = connection.getRepository(Workspace)
    }
    
    public async findBoardById(boardId: number): Promise<Board | null> {
        return await this.boardRepository.findOne({ where: { id: boardId } });
    }

    public async newBoard (newBoardDto: INewBoard , workspace: Workspace): Promise<Board>{

        const newBoard = this.boardRepository.create({
            name: newBoardDto.name,
            workspace
        })
        return await this.boardRepository.save(newBoard)
    }   

    public async updateBoard(updateBoardDto:IUpdateBoard, boardId:number){
        await this.boardRepository.update(
            { id:boardId }, 
            {
                name: updateBoardDto.name
            }
        )
    }

    public async removeBoard( board:Board ){
            await this.boardRepository.remove(board)
    }
}

export default new BoardRepository()