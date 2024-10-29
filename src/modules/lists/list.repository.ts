import { Repository } from "typeorm";
import { List } from "../../orm/entities/List";
import connection from "../../configs/database.connect";
import { INewList ,IUpdateList } from "./dto";
class ListRepository {
    private readonly listRepository: Repository<List>
    constructor(){
        this.listRepository = connection.getRepository(List)
    }

    public async findListById(listId: number): Promise<List | null> {
        return await this.listRepository.findOne({ where: { id: listId } });
    }

    public async newList (name: string, boardId:number): Promise<List>{
        const newList = this.listRepository.create({
            name: name,
            board: {id: boardId}
        })
        return await this.listRepository.save(newList)
    }   

    public async updateList(updateListDto: IUpdateList, listId:number):Promise<void>{
        await this.listRepository.update(
            { id:listId }, 
            {
                name: updateListDto.name
            }
        )
    }

    public async removeList( list:List ):Promise<void>{
            await this.listRepository.remove(list)
    }

    public async getListsByBoard(boardId:number):Promise<List[]>{
        return await this.listRepository.find({where: {board:{id:boardId} }})
    }
}

export default new ListRepository()