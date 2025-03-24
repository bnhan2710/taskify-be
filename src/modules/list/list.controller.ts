import { OK, CREATED } from "../../core/handler/success.reponse";
import ListService from "./list.service";
import { NewListDTO, UpdateListDTO } from "./dto";
import { Request, Response, NextFunction } from "express";
class ListController {
    public async newList(req: Request, res: Response, next: NextFunction) {
        const newListDto = NewListDTO(req.body);
       const created =  await ListService.newlist(newListDto);
        new CREATED({
            message: "Create List Successfully",
            data: created
        }).send(res);
    }

    public async updateList(req: Request, res: Response, next: NextFunction) {
        const listId = req.params.id
        const updateListDto = UpdateListDTO(req.body);
        await ListService.updateList(updateListDto ,listId);
        new OK({
            message: "Update List Successfully"
        }).send(res);
    }

    public async removeList(req: Request, res: Response, next: NextFunction) {
        const listId = req.params.id
        await ListService.removeList(listId);
        new OK({
            message: "Remove List Successfully"
        }).send(res);
    }

    public async getList(req: Request, res: Response, next: NextFunction){
        const boardId = req.query.boardId as string;
        new OK({
            message: "Get List Successfully",
            data: await ListService.getListsByBoard(boardId)
        }).send(res)
    }

    public async getListById(req: Request, res: Response, next: NextFunction){
        const listId = req.params.id
        new OK({
            message: "Get List Successfully",
            data: await ListService.getListById(listId)
        }).send(res)
    }
}

export default new ListController();