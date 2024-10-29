import listRepository from './list.repository';
import { BadRequestError, NotFoundError } from '../../handler/error.response';
import { List } from '../../orm/entities/List';
import { INewList, IUpdateList } from './dto';

class ListService {
    public async newlist(newListDto : INewList): Promise<List> {
        return await listRepository.newList(newListDto.name, newListDto.boardId);
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
        return await listRepository.getListsByBoard(boardId);
    }

}

export default new ListService();