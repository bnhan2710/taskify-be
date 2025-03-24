import { Request,Response ,NextFunction } from "express";
import { OK, CREATED } from "../../core/handler/success.reponse";
import BoardService from "./board.service";
import { NewBoardDTO } from "./dto";
import { UpdateBoardDTO } from './dto/update-board.dto';

class BoardController{ 

    public async newBoard(req: Request, res: Response , next: NextFunction){
        const newBoardDto = NewBoardDTO(req.body)
        const userId = req.userJwt.id
        const boardId = await BoardService.newBoard(newBoardDto, userId)
        new CREATED({
            message: "Create Board Successfully",
            data: boardId
        }).send(res)
    }   

    public async updateBoard(req:Request, res: Response, next: NextFunction){
        const updateBoardDto = UpdateBoardDTO(req.body)
        const boardId = req.params.id
        await BoardService.updateBoard(updateBoardDto, boardId)
        new OK({
            message: "Update Board Successfully"
        }).send(res)
    }

    public async getMyBoard(req:Request, res: Response, next: NextFunction){
        const userId = req.userJwt.id
        const qs  = req.query
        new OK({
            message: "Get Board Successfully",
            data: await BoardService.getMyBoard(userId,qs)
        }).send(res)
    }

    public async removeBoard(req:Request, res: Response, next: NextFunction){
        const boardId = req.params.id
        await BoardService.removeBoard(boardId)
        new OK({
            message: "Remove Board Successfully"
        }).send(res)
   }

    public async getBoardById(req:Request, res: Response, next: NextFunction){
        const boardId = req.params.id
        new OK({
            message: "Get Board Successfully",
            data: await BoardService.getBoardById(boardId)
        }).send(res)
    }

    public async inviteMember(req:Request, res: Response, next: NextFunction){
        const userEmail = req.body.email
        const boardId = req.params.id
        await BoardService.inviteMember(boardId, userEmail)
        new OK({
            message: "Invite Member Successfully"
        }).send(res)
    }

    public async removeMember(req:Request, res: Response, next: NextFunction){
        const userId = req.body.userId
        const boardId = req.params.id
        await BoardService.removeMember(boardId, userId)
        new OK({
            message: "Remove Member Successfully"
        }).send(res)
    }

    public async changeRole(req:Request, res: Response, next: NextFunction){
        const userId = req.body.userId
        const boardId = req.params.id
        const roleName = req.body.roleId
        await BoardService.changeRole(boardId, userId, roleName)
        new OK({
            message: "Change Role Successfully"
        }).send(res)
    }

}
export default new BoardController()