import { Repository } from "typeorm";
import { Board } from "../../orm/entities/Board";
import { Workspace } from "../../orm/entities/Workspace";
import connection from "../../configs/database.connect";
import { INewBoard, IUpdateBoard } from "./dto";
import { BoardUserRole } from "../../orm/entities/BoardUserRole";
class BoardRepository{
    private readonly reposiotry: Repository<Board>
    constructor(){
        this.reposiotry = connection.getRepository(Board)
    }
    
    public async insert(newBoardDto: INewBoard , workspace: Workspace): Promise<string>{
        
        const newBoard = this.reposiotry.create({
            title: newBoardDto.title,
            description: newBoardDto.description,
            workspace: workspace
        })
         await this.reposiotry.save(newBoard)
         return newBoard.id
    }   
    
    public async findById(boardId: string): Promise<Board | null> {
        return await this.reposiotry.findOne({ where: { id: boardId } });
    }

    public async getBoardbyWorkspace(workspaceId:string){
        await this.reposiotry.find({where: {workspace: {id: workspaceId}}})
    }

    public async getBoardDetail(boardId:string){
        return await this.reposiotry.findOne({where: {id: boardId}, relations:['lists', 'lists.cards']})
    }
    public async update(updateBoardDto:IUpdateBoard, boardId:string){
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