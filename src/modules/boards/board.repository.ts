import { Repository } from "typeorm";
import { Board } from "../../orm/entities/Board";
import { Workspace } from "../../orm/entities/Workspace";
import connection from "../../configs/database.connect";
import { INewBoard, IUpdateBoard } from "./dto";

class BoardRepository{
    private readonly boardRepository: Repository<Board>
    constructor(){
        this.boardRepository = connection.getRepository(Board)
    }
    
    public async findBoardById(boardId: number): Promise<Board | null> {
        return await this.boardRepository.findOne({ where: { id: boardId } });
    }

    public async newBoard (newBoardDto: INewBoard , workspace: Workspace): Promise<Board>{

        const newBoard = this.boardRepository.create({
            name: newBoardDto.name,
            workspace: workspace
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

    public async getBoardbyWorkspace(workspaceId:number){
        await this.boardRepository.find({where: {workspace: {id: workspaceId}}})
    }

    public async removeBoard( board:Board ){
            await this.boardRepository.remove(board)
    }
}

export default new BoardRepository()