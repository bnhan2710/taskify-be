import { Repository } from "typeorm";
import { Board } from "../../orm/entities/Board";
import { Workspace } from "../../orm/entities/Workspace";
import connection from "../../configs/database.connect";
import { INewBoard, IUpdateBoard } from "./dto";

class BoardRepository{
    private readonly reposiotry: Repository<Board>
    constructor(){
        this.reposiotry = connection.getRepository(Board)
    }
    
    public async insert(newBoardDto: INewBoard , workspace: Workspace): Promise<Board>{
        
        const newBoard = this.reposiotry.create({
            title: newBoardDto.title,
            description: newBoardDto.description,
            workspace: workspace
        })
        return await this.reposiotry.save(newBoard)
    }   
    
    public async findById(boardId: number): Promise<Board | null> {
        return await this.reposiotry.findOne({ where: { id: boardId } });
    }

    public async getBoardbyWorkspace(workspaceId:number){
        await this.reposiotry.find({where: {workspace: {id: workspaceId}}})
    }

    public async getBoardDetail(boardId:number){
        return await this.reposiotry.findOne({where: {id: boardId}, relations:['lists', 'lists.cards']})
    }
    public async update(updateBoardDto:IUpdateBoard, boardId:number){
        await this.reposiotry.update(
            { id:boardId }, 
            {
                title: updateBoardDto.title,
                description: updateBoardDto.description,
                listOrderIds: updateBoardDto.listOrderIds
            }
        )
    }


    public async detele( board:Board ){
            await this.reposiotry.remove(board)
    }
}

export default new BoardRepository()