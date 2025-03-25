import { Board } from "../../../database/entities/Board";
import { List } from "../../../database/entities/List";

export interface ICreateList {
    title:string,
    boardId: string;
}

export interface IUpdateList {
    title?: string;
    cardOrderIds?: string[]
}

export interface IListService { 
    createList(CreateListDto : ICreateList): Promise<List>;
    getListsByBoard(boardId: string): Promise<List[]>;
    getListById(listId: string): Promise<List>;
    updateList(updateListDto:IUpdateList , listId: string): Promise<void>;
    removeList(listId: string): Promise<void>;
}

export interface IListRepository{ 
    insert(createListDto: ICreateList, board: Board): Promise<List>;
    findById(listId: string): Promise<List | null>;
    getByBoard(boardId:string):Promise<List[]>;
    update(updateListDto: IUpdateList, listId:string):Promise<void>;
    remove( list:List ):Promise<void>
}


