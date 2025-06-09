import { OK, CREATED } from '../../core/handler/success.reponse';
import ListService from './list.service';
import { ListMapper } from './mapper/list.mapper';
import { Request, Response, NextFunction } from 'express';
class ListController {
  public async CreateList(req: Request, res: Response, _next: NextFunction) {
    const CreateListDto = ListMapper.toCreateListDTO(req.body);
    const userId = req.userJwt?.id;
    const created = await ListService.createList(CreateListDto, userId);
    new CREATED({
      message: 'Create List Successfully',
      data: created,
    }).send(res);
  }

  public async updateList(req: Request, res: Response, _next: NextFunction) {
    const listId = req.params.id;
    const updateListDto = ListMapper.toUpdateListDTO(req.body);
    const userId = req.userJwt?.id;
    await ListService.updateList(updateListDto, listId, userId);
    new OK({
      message: 'Update List Successfully',
    }).send(res);
  }

  public async removeList(req: Request, res: Response, _next: NextFunction) {
    const listId = req.params.id;
    const userId = req.userJwt?.id;
    await ListService.removeList(listId, userId);
    new OK({
      message: 'Remove List Successfully',
    }).send(res);
  }

  public async getList(req: Request, res: Response, _next: NextFunction) {
    const boardId = req.query.boardId as string;
    new OK({
      message: 'Get List Successfully',
      data: await ListService.getListsByBoard(boardId),
    }).send(res);
  }

  public async getListById(req: Request, res: Response, _next: NextFunction) {
    const listId = req.params.id;
    new OK({
      message: 'Get List Successfully',
      data: await ListService.getListById(listId),
    }).send(res);
  }
}

export default new ListController();
