import listRepository from './list.repository';
import { BadRequestError, NotFoundError } from '../../handler/error.response';
import { List } from '../../orm/entities/List';
import boardRepository from '../board/board.repository';
import { INewList, IUpdateList } from './dto';


class ListService {
    public async newlist(newListDto : INewList): Promise<List> {
        const board = await boardRepository.findById(newListDto.boardId)
        if(!board){
            throw new NotFoundError('Board not found')
        } 
        return await listRepository.insert(newListDto, board);
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
        await listRepository.updateList(updateListDto, listId);
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