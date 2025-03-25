import { Repository } from "typeorm";
import { Board } from "../../database/entities/Board";
import { Workspace } from "../../database/entities/Workspace";
import connection from "../../core/configs/database.connect";
import { IBoardRepository, ICreateBoard, IUpdateBoard, ListBoard } from "./interface";
import { BoardUserRole } from "../../database/entities/BoardUserRole";
class BoardRepository implements IBoardRepository{
    private readonly repository: Repository<Board>
    constructor(){
        this.repository = connection.getRepository(Board)
    }
    
    public async insert(newBoardDto: ICreateBoard , workspace: Workspace): Promise<string>{
        
        const newBoard = this.repository.create({
            title: newBoardDto.title,
            description: newBoardDto.description,
            type: newBoardDto.type,
            workspace: workspace
        })
         await this.repository.save(newBoard)
         return newBoard.id
    }   
    
    public async findById(boardId: string): Promise<Board | null> {
        return await this.repository.findOne({ where: { id: boardId } });
    }

    public async getMyBoard(userId:string,qs: any) : Promise<ListBoard>{ 
        //get all board of user with pagination
        const page = parseInt(qs.page) || 1
        const limit = parseInt(qs.limit) || 10
        const skip = (page - 1) * limit
        const [boards, total] = await this.repository.findAndCount({
            join: {
              alias: 'board',
              innerJoin: {
                boardUserRoles: 'board.boardUserRoles'
              }
            },
            where: {
              boardUserRoles: {
                userId: userId
              }
            },
            skip: skip,
            take: limit
          })
          return { boards, totalBoards: total }

    }

    public async getBoardDetail(boardId:string) : Promise<any>{
        const board = await this.repository.findOne({where: {id: boardId}, relations:['lists', 'lists.cards','boardUserRoles']})
        const userInfo = await connection.getRepository(BoardUserRole).find({where:{boardId:boardId}, relations:['user']})
        const boardUsers: any[] = []
        userInfo.forEach((user)=>{
            //push user with username and avatar to boardUsers
            boardUsers.push({ 
                id:user.user.id,
                username: user.user.username,
                avatar: user.user.avatar,
                email: user.user.email,
                displayName: user.user.displayName })
        })
        return {...board, boardUsers}
    }
    public async update(updateBoardDto:IUpdateBoard, boardId:string){
        await this.repository.update(
            { id:boardId }, 
            {
                title: updateBoardDto.title,
                description: updateBoardDto.description,
                listOrderIds: updateBoardDto.listOrderIds
            }
        )
    }


    public async detele( board:Board ){
            await this.repository.remove(board)
    }
}

export default new BoardRepository()