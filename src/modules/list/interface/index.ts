import { ICreateList, IUpdateList } from '../dto';

export interface List {
  id: string;
  title: string;
  boardId: string;
  cardOrderIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IListService {
  createList(CreateListDto: ICreateList): Promise<List>;
  getListsByBoard(boardId: string): Promise<List[]>;
  getListById(listId: string): Promise<List>;
  updateList(updateListDto: IUpdateList, listId: string): Promise<void>;
  removeList(listId: string): Promise<void>;
}

export interface IListRepository {
  insert(createListDto: ICreateList): Promise<List>;
  findById(listId: string): Promise<List | null>;
  getByBoard(boardId: string): Promise<List[]>;
  update(updateListDto: IUpdateList, listId: string): Promise<void>;
  remove(listId: string): Promise<void>;
}
