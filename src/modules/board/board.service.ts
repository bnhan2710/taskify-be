import { BadRequestError, NotFoundError } from '../../core/handler/error.response';
import boardRepository from './board.repository';
import workspaceRepository from '../workspace/workspace.repository';
import {
  IBoardService,
  ICreateBoard,
  IUpdateBoard,
  ListBoard,
  IInviteMember,
  BoardDetail,
} from './interface';
import { BoardUserRole } from '../../database/entities/BoardUserRole';
import { Role } from '../../database/entities/Role';
import { RoleEnum } from '../../shared/common/enums/role';
import connection from '../../core/configs/database.connect';
import cacheService from '../../shared/services/cache.service';
import notificationService from '../notification/notification.service';
class BoardService implements IBoardService {
  public async newBoard(newBoardDto: ICreateBoard, userId: string): Promise<string> {
    const workspace = await workspaceRepository.findbyId(newBoardDto.workspaceId);
    if (!workspace) {
      throw new NotFoundError('Workspace not found');
    }
    const boardId = await boardRepository.insert(newBoardDto, workspace);
    const userRole = await connection
      .getRepository(Role)
      .findOne({ where: { name: RoleEnum.OWNER } });
    await connection.getRepository(BoardUserRole).insert({
      boardId,
      userId,
      roleId: userRole?.id,
    });
    return boardId;
  }

  public async getMyBoards(userId: string, qs: any): Promise<ListBoard> {
    return await boardRepository.getMyBoard(userId, qs);
  }

  public async getPublicBoard(qs: any): Promise<ListBoard> {
    return await boardRepository.getPublicBoard(qs);
  }

  public async searchBoards(userId: string, qs: any): Promise<ListBoard> {
    return await boardRepository.searchBoards(userId, qs);
  }

  public async getClosedBoard(userId: string): Promise<ListBoard> {
    return await boardRepository.getClosedBoard(userId);
  }

  public async getBoardById(boardId: string): Promise<BoardDetail> {
    const board = await boardRepository.getBoardDetail(boardId);
    if (!board) {
      throw new NotFoundError('Board not found');
    }
    return board;
  }

  public async updateBoard(updateBoardDto: IUpdateBoard, boardId: string): Promise<void> {
    const board = await boardRepository.findById(boardId);
    if (!board) {
      throw new NotFoundError('Board not found');
    }
    return await boardRepository.update(updateBoardDto, boardId);
  }

  public async removeBoard(boardId: string) {
    const board = await boardRepository.findById(boardId);
    if (!board) {
      throw new NotFoundError('Board not found');
    }
    return await boardRepository.detele(board);
  }

  public async inviteMember(boardId: string, inviteMemberDto: IInviteMember) {
    const board = await boardRepository.findById(boardId);
    if (!board) {
      throw new NotFoundError('Board not found');
    }
    const role = await connection
      .getRepository(Role)
      .findOne({ where: { name: inviteMemberDto.roleName } });
    if (!role) {
      throw new NotFoundError('Role not found');
    }
    const user = await connection
      .getRepository('User')
      .findOne({ where: { email: inviteMemberDto.email } });
    if (!user) {
      throw new NotFoundError(`Not found user with email ${inviteMemberDto.email}`);
    }
    const boardUserRole = await connection.getRepository(BoardUserRole).findOne({
      where: { boardId, userId: user.id },
    });
    if (boardUserRole) {
      throw new BadRequestError('User already in board');
    }
    notificationService.createNotification({
      message: `You have been invited to join the board ${board.title}`,
      userId: user.id,
      boardId: boardId,
    });
  }

  public async removeMember(boardId: string, userId: string) {
    const board = await boardRepository.findById(boardId);
    if (!board) {
      throw new NotFoundError('Board not found');
    }
    await connection.getRepository(BoardUserRole).delete({
      boardId,
      userId,
    });
  }

  public async changeRole(boardId: string, userId: string, roleName: string) {
    const board = await boardRepository.findById(boardId);
    if (!board) {
      throw new NotFoundError('Board not found');
    }
    const role = await connection.getRepository(Role).findOne({ where: { name: roleName } });
    if (!role) {
      throw new NotFoundError('Role not found');
    }
    await cacheService.del(`board:${boardId}:user:${userId}`);
    await connection.getRepository(BoardUserRole).update({ boardId, userId }, { roleId: role.id });
  }

  public async closeBoard(boardId: string): Promise<void> {
    const board = await boardRepository.findById(boardId);
    if (!board) {
      throw new NotFoundError('Board not found');
    }
    return await boardRepository.closeBoard(boardId);
  }

  public async reopenBoard(boardId: string): Promise<void> {
    const board = await boardRepository.findById(boardId);
    if (!board) {
      throw new NotFoundError('Board not found');
    }
    if (!board.isClosed) {
      throw new BadRequestError('Board is not closed');
    }
    return await boardRepository.reopenBoard(boardId);
  }
}

export default new BoardService();
