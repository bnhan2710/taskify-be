import listRepository from './list.repository';
import { BadRequestError, NotFoundError } from '../../handler/error.response';
import { List } from '../../orm/entities/List';
import boardRepository from '../boards/board.repository';
import { INewList, IUpdateList } from './dto';


class ListService {
    public async newlist(newListDto : INewList): Promise<List> {
        const board = await boardRepository.findBoardById(newListDto.boardId)
        if(!board){
            throw new NotFoundError('Board not found')
        } 
        return await listRepository.newList(newListDto, board);
    }

    public async updateList(updateListDto:IUpdateList , listId: number): Promise<void> {
        const list = await listRepository.findListById(listId);
        if (!list) {
            throw new NotFoundError('List not found');
        }
        await listRepository.updateList(updateListDto, listId);
    }

    public async removeList(listId: number): Promise<void> {
        const list = await listRepository.findListById(listId);
        if (!list) {
            throw new NotFoundError('List not found');
        }
        await listRepository.removeList(list);
    }

    public async getListsByBoard(boardId: number): Promise<List[]> {
        const board = boardRepository.findBoardById(boardId)
        if(!board){
            throw new NotFoundError('Board not found')
        }
        return await listRepository.getListsByBoard(boardId);
    }

    public async getListById(listId: number): Promise<List> {
        const list = await listRepository.findListById(listId);
        if (!list) {
            throw new NotFoundError('List not found');
        }
        return list;
    }
}

export default new ListService();