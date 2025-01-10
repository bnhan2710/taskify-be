import { NotFoundError } from "../../handler/error.response";
import boardRepository from "./board.repository";
import workspaceRepository from "../workspace/workspace.repository";
import { INewBoard, IUpdateBoard } from "./dto";
import { BoardUserRole } from "../../orm/entities/BoardUserRole";
import { Role } from "../../orm/entities/Role";
import { RoleEnum } from "../../common/enums/role";
import connection from "../../configs/database.connect";
import cacheUtil from "../../utils/cache.util";
class BoardService{

    public async newBoard (newBoardDto: INewBoard, userId: string): Promise<string>{
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

    public async updateBoard(updateBoardDto:IUpdateBoard, boardId:string){
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

    public async getMyBoard(userId:string,qs: any){
        return await boardRepository.getMyBoard(userId,qs)
    }

    public async getBoardById(boardId: string){
        const board = await boardRepository.getBoardDetail(boardId)
        if(!board){
            throw new NotFoundError('Board not found')
        }
        return board
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
        await cacheUtil.del(`board:${boardId}:user:${userId}`)
        await connection.getRepository(BoardUserRole).update(
            {boardId, userId},
            {roleId: role.id}
        )
    }

}

export default new BoardService()