import { Request, Response, NextFunction } from 'express';
import { OK, CREATED } from '../../core/handler/success.reponse';
import BoardService from './board.service';
import { NewBoardDTO, UpdateBoardDTO, InviteMemberDTO } from './dto';

class BoardController {
  public async newBoard(req: Request, res: Response, _next: NextFunction) {
    const newBoardDto = NewBoardDTO(req.body);
    const userId = req.userJwt.id;
    const boardId = await BoardService.newBoard(newBoardDto, userId);
    new CREATED({
      message: 'Create Board Successfully',
      data: boardId,
    }).send(res);
  }

  public async updateBoard(req: Request, res: Response, _next: NextFunction) {
    const updateBoardDto = UpdateBoardDTO(req.body);
    const boardId = req.params.id;
    await BoardService.updateBoard(updateBoardDto, boardId);
    new OK({
      message: 'Update Board Successfully',
    }).send(res);
  }

  public async getMyBoard(req: Request, res: Response, _next: NextFunction) {
    const userId = req.userJwt.id;
    const qs = req.query;
    new OK({
      message: 'Get Board Successfully',
      data: await BoardService.getMyBoards(userId, qs),
    }).send(res);
  }

  public async getPublicBoard(req: Request, res: Response, _next: NextFunction) {
    const qs = req.query;
    new OK({
      message: 'Get Public Board Successfully',
      data: await BoardService.getPublicBoard(qs),
    }).send(res);
  }

  public async searchBoards(req: Request, res: Response, _next: NextFunction) {
    const userId = req.userJwt.id;
    const qs = req.query;
    new OK({
      message: 'Search Boards Successfully',
      data: await BoardService.searchBoards(userId, qs),
    }).send(res);
  }

  public async getBoardById(req: Request, res: Response, _next: NextFunction) {
    const boardId = req.params.id;
    new OK({
      message: 'Get Board Successfully',
      data: await BoardService.getBoardById(boardId),
    }).send(res);
  }

  public async getClosedBoard(req: Request, res: Response, _next: NextFunction) {
    const userId = req.userJwt.id;
    new OK({
      message: 'Get Closed Board Successfully',
      data: await BoardService.getClosedBoard(userId),
    }).send(res);
  }

  public async removeBoard(req: Request, res: Response, _next: NextFunction) {
    const boardId = req.params.id;
    await BoardService.removeBoard(boardId);
    new OK({
      message: 'Remove Board Successfully',
    }).send(res);
  }

  public async inviteMember(req: Request, res: Response, _next: NextFunction) {
    const InviteMemberDto = InviteMemberDTO(req.body);
    const boardId = req.params.id;
    await BoardService.inviteMember(boardId, InviteMemberDto);
    new OK({
      message: 'Invite Member Successfully',
    }).send(res);
  }

  public async removeMember(req: Request, res: Response, _next: NextFunction) {
    const userId = req.params.userId;
    const boardId = req.params.id;
    await BoardService.removeMember(boardId, userId);
    new OK({
      message: 'Remove Member Successfully',
    }).send(res);
  }

  public async changeRole(req: Request, res: Response, _next: NextFunction) {
    const userId = req.body.userId;
    const boardId = req.params.id;
    const roleName = req.body.roleId;
    await BoardService.changeRole(boardId, userId, roleName);
    new OK({
      message: 'Change Role Successfully',
    }).send(res);
  }

  public async quitBoard(req: Request, res: Response, _next: NextFunction) {
    const boardId = req.params.id;
    const userId = req.userJwt.id;
    await BoardService.quitBoard(boardId, userId);
    new OK({
      message: 'Quit Board Successfully',
    }).send(res);
  }

  public async closeBoard(req: Request, res: Response, _next: NextFunction) {
    const boardId = req.params.id;
    await BoardService.closeBoard(boardId);
    new OK({
      message: 'Close Board Successfully',
    }).send(res);
  }

  public async reopenBoard(req: Request, res: Response, _next: NextFunction) {
    const boardId = req.params.id;
    await BoardService.reopenBoard(boardId);
    new OK({
      message: 'Reopen Board Successfully',
    }).send(res);
  }
}
export default new BoardController();
