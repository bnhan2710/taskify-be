import { Repository } from 'typeorm';
import { ListEntity } from '../../database/entities/List';
import connection from '../../core/configs/database.connect';
import { IListRepository, List } from './interface';
import { ICreateList, IUpdateList } from './dto';
import { ListMapper } from './mapper/list.mapper';

export class ListRepository implements IListRepository {
  private readonly repository: Repository<ListEntity>;

  constructor() {
    this.repository = connection.getRepository(ListEntity);
  }

  public async insert(createListDto: ICreateList): Promise<List> {
    const savedList = await this.repository.save({
      ...createListDto,
      board: { id: createListDto.boardId },
    });
    return ListMapper.toList(savedList);
  }

  public async findById(listId: string): Promise<List | null> {
    const list = await this.repository.findOne({ where: { id: listId } });
    return list ? ListMapper.toList(list) : null;
  }

  public async getByBoard(boardId: string): Promise<List[]> {
    const lists = await this.repository.find({
      where: { board: { id: boardId } },
      order: { createdAt: 'ASC' },
    });
    return lists.map((list) => ListMapper.toList(list));
  }

  public async update(updateListDto: IUpdateList, listId: string): Promise<void> {
    await this.repository.update({ id: listId }, updateListDto);
  }

  public async remove(listid: string): Promise<void> {
    await this.repository.delete({ id: listid } as any);
  }
}
