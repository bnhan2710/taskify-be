import listRepository from './list.repository';
import { BadRequestError, NotFoundError } from '../../core/handler/error.response';
import { List } from '../../database/entities/List';
import boardRepository from '../board/board.repository';
import { ICreateList, IListService, IUpdateList } from './interface';


class ListService implements IListService {
    public async createList(CreateListDto : ICreateList): Promise<List> {
        const board = await boardRepository.findById(CreateListDto.boardId)
        if(!board){
            throw new NotFoundError('Board not found')
        } 
        return await listRepository.insert(CreateListDto, board);
    }
    
    public async getListsByBoard(boardId: string): Promise<List[]> {
        const board = boardRepository.findById(boardId)
        if(!board){
            throw new NotFoundError('Board not found')
        }
        return await listRepository.getByBoard(boardId);
    }

    public async getListById(listId: string): Promise<List> {
        const list = await listRepository.findById(listId);
        if (!list) {
            throw new NotFoundError('List not found');
        }
        return list;
    }
    
    public async updateList(updateListDto:IUpdateList , listId: string): Promise<void> {
        const list = await listRepository.findById(listId);
        if (!list) {
            throw new NotFoundError('List not found');
        }
        await listRepository.update(updateListDto, listId);
    }

    public async removeList(listId: string): Promise<void> {
        const list = await listRepository.findById(listId);
        if (!list) {
            throw new NotFoundError('List not found');
        }
        await listRepository.remove(list);
    }

}

export default new ListService();