import { ListRepository } from './list.repository';
import boardRepository from '../board/board.repository';
import { BadRequestError, NotFoundError } from '../../core/handler/error.response';
import { IListRepository, List } from './interface';
import { IListService } from './interface';
import { ICreateList, IUpdateList } from './dto';
import connection from '../../core/configs/database.connect';
import { ListMapper } from './mapper/list.mapper';
import ActivitiesService from '../activity/activities.service';
import { ActivityType } from '../../shared/common/enums/activity';

class ListService implements IListService {
  private listRepository: IListRepository;

  constructor() {
    this.listRepository = new ListRepository();
  }

  public async createList(CreateListDto: ICreateList, userId?: string): Promise<List> {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const board = await boardRepository.findById(CreateListDto.boardId);
      if (!board) {
        throw new NotFoundError('Board not found');
      }
      const listOrderIds = board.listOrderIds || [];
      const newList = await this.listRepository.insert(CreateListDto);
      const list = ListMapper.toList(newList);
      listOrderIds.push(list.id.toString());
      await boardRepository.update({ listOrderIds }, CreateListDto.boardId);

      // Log activity
      if (userId) {
        await ActivitiesService.logActivity({
          type: ActivityType.LIST_CREATED,
          userId,
          boardId: CreateListDto.boardId,
          listId: list.id,
          metadata: { listTitle: list.title },
        });
      }

      await queryRunner.commitTransaction();
      return list;
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
    const board = await boardRepository.findById(boardId);
    if (!board) {
      throw new NotFoundError('Board not found');
    }
    const lists = await this.listRepository.getByBoard(boardId);
    return lists.map((list) => ListMapper.toList(list));
  }

  public async getListById(listId: string): Promise<List> {
    const list = await this.listRepository.findById(listId);
    if (!list) {
      throw new NotFoundError('List not found');
    }
    return ListMapper.toList(list);
  }

  public async updateList(
    updateListDto: IUpdateList,
    listId: string,
    userId?: string,
  ): Promise<void> {
    const list = await this.listRepository.findById(listId);
    if (!list) {
      throw new NotFoundError('List not found');
    }

    await this.listRepository.update(updateListDto, listId);

    // Log activity
    if (userId) {
      await ActivitiesService.logActivity({
        type: ActivityType.LIST_UPDATED,
        userId,
        boardId: list.board.id,
        listId: listId,
        metadata: {
          listTitle: updateListDto.title || list.title,
          changes: updateListDto,
        },
      });
    }
  }

  public async removeList(listId: string, userId?: string): Promise<void> {
    const list = await this.listRepository.findById(listId);
    if (!list) {
      throw new NotFoundError('List not found');
    }

    // Log activity before removing
    if (userId) {
      await ActivitiesService.logActivity({
        type: ActivityType.LIST_DELETED,
        userId,
        boardId: list.board.id,
        listId: listId,
        metadata: { listTitle: list.title },
      });
    }

    await this.listRepository.remove(listId);
  }
}

export default new ListService();
