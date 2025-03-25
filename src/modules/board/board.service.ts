import { NotFoundError } from "../../core/handler/error.response";
import boardRepository from "./board.repository";
import workspaceRepository from "../workspace/workspace.repository";
import { IBoardService, ICreateBoard, IUpdateBoard, ListBoard } from "./interface";
import { BoardUserRole } from "../../database/entities/BoardUserRole";
import { Role } from "../../database/entities/Role";
import { RoleEnum } from "../../shared/common/enums/role";
import connection from "../../core/configs/database.connect";
import cacheService from "../../shared/services/cache.service";
class BoardService implements IBoardService {

    public async newBoard (newBoardDto: ICreateBoard, userId: string): Promise<string>{
        const workspace = await workspaceRepository.findbyId(newBoardDto.workspaceId)
        if(!workspace){
            throw new NotFoundError('Workspace not found')
        }
        const boardId = await boardRepository.insert(newBoardDto, workspace)
        const userRole = await connection.getRepository(Role).findOne({where: {name: RoleEnum.OWNER}})
        await connection.getRepository(BoardUserRole).insert({
            boardId,
            userId,
            roleId: userRole?.id
        })
        return boardId
    }   

    public async updateBoard(updateBoardDto:IUpdateBoard, boardId:string) : Promise<void>{
        const board = await boardRepository.findById(boardId)
        if(!board){
            throw new NotFoundError('Board not found')
        }
        return await boardRepository.update(updateBoardDto , boardId)
    }

    public async removeBoard(boardId:string){
        const board = await boardRepository.findById(boardId)
        if(!board){
            throw new NotFoundError('Board not found')
        }
        return await boardRepository.detele(board)
    }

    public async getMyBoards(userId:string,qs: any) : Promise<ListBoard>{
        return await boardRepository.getMyBoard(userId,qs)
    }

    public async getBoardById(boardId: string) : Promise<any>{
        const board = await boardRepository.getBoardDetail(boardId)
        if(!board){
            throw new NotFoundError('Board not found')
        }
        return  board 
    }

    public async inviteMember(boardId: string, userEmail: string){
        console.log(boardId)
        const board = await boardRepository.findById(boardId)
        if(!board){
            throw new NotFoundError('Board not found')
        }
        const role = await connection.getRepository(Role).findOne({where: {name: RoleEnum.MEMBER}})
        if(!role){
            throw new NotFoundError('Role not found')
        }
        const user  = await connection.getRepository('User').findOne({where: {email: userEmail}})
        if(!user){
            throw new NotFoundError('User not found')
        }
        await connection.getRepository(BoardUserRole).insert({
            boardId,
            userId: user.id,
            roleId: role.id
        })
    }

    public async removeMember(boardId: string, userId: string){
        const board = await boardRepository.findById(boardId)
        if(!board){
            throw new NotFoundError('Board not found')
        }
        await connection.getRepository(BoardUserRole).delete({
            boardId,
            userId
        })
    }

    public async changeRole(boardId: string, userId: string, roleName: string){ 
        const board = await boardRepository.findById(boardId)
        if(!board){
            throw new NotFoundError('Board not found')
        }
        const role = await connection.getRepository(Role).findOne({where: {name: roleName}})
        if(!role){
            throw new NotFoundError('Role not found')
        }
        await cacheService.del(`board:${boardId}:user:${userId}`)
        await connection.getRepository(BoardUserRole).update(
            {boardId, userId},
            {roleId: role.id}
        )
    }

}

export default new BoardService()