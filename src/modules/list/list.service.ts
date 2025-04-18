import { ListRepository } from './list.repository';
import boardRepository from '../board/board.repository';
import { BadRequestError, NotFoundError } from '../../core/handler/error.response';
import { List } from './interface';
import { IListService } from './interface';
import { ICreateList, IUpdateList } from './dto';
import connection from '../../core/configs/database.connect';

class ListService implements IListService {
  private listRepository: ListRepository;

  constructor() {
    this.listRepository = new ListRepository();
  }

  public async createList(CreateListDto: ICreateList): Promise<List> {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const board = await boardRepository.findById(CreateListDto.boardId);
      if (!board) {
        throw new NotFoundError('Board not found');
      }
      let listOrderIds = board.listOrderIds || [];
      const newList = await this.listRepository.insert(CreateListDto);
      listOrderIds.push(newList.id.toString());
      await boardRepository.update({ listOrderIds }, CreateListDto.boardId);
      await queryRunner.commitTransaction();
      return newList;
    } catch (error: any) {
      await queryRunner.rollbackTransaction();
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new BadRequestError(`Failed to create list: ${error.message}`);
    } finally {
      await queryRunner.release();
    }
  }

  public async getListsByBoard(boardId: string): Promise<List[]> {
    const board = boardRepository.findById(boardId);
    if (!board) {
      throw new NotFoundError('Board not found');
    }
    return await this.listRepository.getByBoard(boardId);
  }

  public async getListById(listId: string): Promise<List> {
    const list = await this.listRepository.findById(listId);
    if (!list) {
      throw new NotFoundError('List not found');
    }
    return list;
  }

  public async updateList(updateListDto: IUpdateList, listId: string): Promise<void> {
    const list = await this.listRepository.findById(listId);
    if (!list) {
      throw new NotFoundError('List not found');
    }
    await this.listRepository.update(updateListDto, listId);
  }

  public async removeList(listId: string): Promise<void> {
    const list = await this.listRepository.findById(listId);
    if (!list) {
      throw new NotFoundError('List not found');
    }
    await this.listRepository.remove(listId);
  }
}

export default new ListService();
