import { ICreateList, IUpdateList } from '../dto';
import { ListEntity } from '../../../database/entities/List';
export interface List {
  id: string;
  title: string;
  boardId: string;
  cardOrderIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IListService {
  createList(CreateListDto: ICreateList, userId?: string): Promise<List>;
  getListsByBoard(boardId: string): Promise<List[]>;
  getListById(listId: string): Promise<List>;
  updateList(updateListDto: IUpdateList, listId: string, userId?: string): Promise<void>;
  removeList(listId: string, userId?: string): Promise<void>;
}

export interface IListRepository {
  insert(createListDto: ICreateList): Promise<ListEntity>;
  findById(listId: string): Promise<ListEntity | null>;
  getByBoard(boardId: string): Promise<ListEntity[]>;
  update(updateListDto: IUpdateList, listId: string): Promise<void>;
  remove(listId: string): Promise<void>;
}
