import { Repository } from 'typeorm';
import { Board } from '../../database/entities/Board';
import { Workspace } from '../../database/entities/Workspace';
import connection from '../../core/configs/database.connect';
import { IBoardRepository, ICreateBoard, IUpdateBoard, ListBoard } from './interface';
import { BoardUserRole } from '../../database/entities/BoardUserRole';
import { RoleEnum } from '../../shared/common/enums/role';
class BoardRepository implements IBoardRepository {
  private readonly repository: Repository<Board>;
  constructor() {
    this.repository = connection.getRepository(Board);
  }

  public async insert(newBoardDto: ICreateBoard, workspace: Workspace): Promise<string> {
    const newBoard = this.repository.create({
      title: newBoardDto.title,
      description: newBoardDto.description,
      type: newBoardDto.type,
      workspace: workspace,
    });
    await this.repository.save(newBoard);
    return newBoard.id;
  }

  public async findById(boardId: string): Promise<Board | null> {
    return await this.repository.findOne({ where: { id: boardId } });
  }

  public async getMyBoard(userId: string, qs: any): Promise<ListBoard> {
    const page = parseInt(qs.page) || 1;
    const limit = parseInt(qs.limit) || 10;
    const skip = (page - 1) * limit;
    const [boards, total] = await this.repository.findAndCount({
      join: {
        alias: 'board',
        innerJoin: {
          boardUserRoles: 'board.boardUserRoles',
        },
      },
      where: [{ boardUserRoles: { userId: userId }, isClosed: false }],
      skip: skip,
      take: limit,
      order: {
        createdAt: 'DESC',
      },
    });
    return { boards, totalBoards: total };
  }

  public async getClosedBoard(userId: string): Promise<ListBoard> {
    const [boards, total] = await this.repository.findAndCount({
      join: {
        alias: 'board',
        innerJoin: {
          boardUserRoles: 'board.boardUserRoles',
        },
      },
      where: [
        { boardUserRoles: { userId: userId, role: { name: RoleEnum.OWNER } }, isClosed: true },
      ],
      order: {
        createdAt: 'DESC',
      },
    });
    return { boards, totalBoards: total };
  }

  public async getPublicBoard(qs: any): Promise<ListBoard> {
    const page = parseInt(qs.page) || 1;
    const limit = parseInt(qs.limit) || 10;
    const skip = (page - 1) * limit;
    const [boards, total] = await this.repository.findAndCount({
      where: {
        type: 'public',
        isClosed: false,
      },
      skip: skip,
      take: limit,
      order: {
        createdAt: 'DESC',
      },
    });
    return { boards, totalBoards: total };
  }

  public async getBoardDetail(boardId: string): Promise<any> {
    const board = await this.repository.findOne({
      where: { id: boardId },
      relations: ['lists', 'lists.cards', 'boardUserRoles'],
    });
    const userInfo = await connection
      .getRepository(BoardUserRole)
      .find({ where: { boardId: boardId }, relations: ['user', 'role'] });
    const boardUsers: any[] = [];
    userInfo.forEach((user) => {
      boardUsers.push({
        id: user.user.id,
        role: user.role.name,
        username: user.user.username,
        avatar: user.user.avatar,
        email: user.user.email,
        displayName: user.user.displayName,
      });
    });
    return { ...board, boardUsers };
  }
  public async update(updateBoardDto: IUpdateBoard, boardId: string) {
    await this.repository.update(
      { id: boardId },
      {
        title: updateBoardDto.title,
        description: updateBoardDto.description,
        listOrderIds: updateBoardDto.listOrderIds,
        type: updateBoardDto.type,
      },
    );
  }

  public async detele(board: Board) {
    await this.repository.remove(board);
  }

  public async closeBoard(boardId: string) {
    await this.repository.update({ id: boardId }, { isClosed: true });
  }

  public async reopenBoard(boardId: string) {
    await this.repository.update({ id: boardId }, { isClosed: false });
  }
}

export default new BoardRepository();
