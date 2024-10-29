import { OK, CREATED } from "../../handler/success.reponse";
import ListService from "./list.service";
import { NewListDTO, UpdateListDTO } from "./dto";
import { Request, Response, NextFunction } from "express";
class ListController {
    public async newList(req: Request, res: Response, next: NextFunction) {
        const newListDto = NewListDTO(req.body);
        await ListService.newlist(newListDto);
        new CREATED({
            message: "Create List Successfully"
        }).send(res);
    }

    public async updateList(req: Request, res: Response, next: NextFunction) {
        const listId = parseInt(req.params.id);
        const updateListDto = UpdateListDTO(req.body);
        await ListService.updateList(updateListDto ,listId);
        new OK({
            message: "Update List Successfully"
        }).send(res);
    }

    public async removeList(req: Request, res: Response, next: NextFunction) {
        const listId = parseInt(req.params.id);
        await ListService.removeList(listId);
        new OK({
            message: "Remove List Successfully"
        }).send(res);
    }

    public async getList(req: Request, res: Response, next: NextFunction){
        const {boardId} = req.body 
        new OK({
            message: "Get List Successfully",
            data: await ListService.getListsByBoard(boardId)
        }).send(res)
    }
}

export default new ListController();