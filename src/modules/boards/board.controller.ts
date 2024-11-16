import { Request,Response ,NextFunction } from "express";
import { OK, CREATED } from "../../handler/success.reponse";
import BoardService from "./board.service";
import { NewBoardDTO } from "./dto";
import { UpdateBoardDTO } from './dto/update-board.dto';

class BoardController{ 

    public async newBoard(req: Request, res: Response , next: NextFunction){
        const newBoardDto = NewBoardDTO(req.body)
        await BoardService.newBoard(newBoardDto)
        new CREATED({
            message: "Create Board Successfully"
        }).send(res)
    }   

    public async updateBoard(req:Request, res: Response, next: NextFunction){
        const updateBoardDto = UpdateBoardDTO(req.body)
        const boardId = parseInt(req.params.id)
        await BoardService.updateBoard(updateBoardDto, boardId)
        new OK({
            message: "Update Board Successfully"
        }).send(res)
    }

    public async getBoardByWorkspace(req:Request, res: Response, next: NextFunction){
        const workspaceId = parseInt(req.query.workspaceId as string)
        new OK({
            message: "Get Board Successfully",
            data: await BoardService.getBoardByWorkspace(workspaceId)
        }).send(res)
    }

    public async removeBoard(req:Request, res: Response, next: NextFunction){
        const boardId = parseInt(req.params.id)
        await BoardService.removeBoard(boardId)
        new OK({
            message: "Remove Board Successfully"
        }).send(res)
   }

    public async getBoardById(req:Request, res: Response, next: NextFunction){
        const boardId = parseInt(req.params.id)
        new OK({
            message: "Get Board Successfully",
            data: await BoardService.getBoardById(boardId)
        }).send(res)
    }

}
export default new BoardController()