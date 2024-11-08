import { Repository } from "typeorm";
import { List } from "../../orm/entities/List";
import connection from "../../configs/database.connect";
import { Board } from "../../orm/entities/Board";
import { INewList ,IUpdateList } from "./dto";
class ListRepository {
    private readonly repository: Repository<List>
    constructor(){
        this.repository = connection.getRepository(List)
    }
    
    public async insert(newListDto:INewList, board:Board): Promise<List>{
        const newList = this.repository.create({
                name: newListDto.name,
                board
        })
        return await this.repository.save(newList)
    }   

    public async findById(listId: number): Promise<List | null> {
        return await this.repository.findOne({ where: { id: listId } });
    }

    
    public async getByBoard(boardId:number):Promise<List[]>{
            return await this.repository.find({where: {board:{id:boardId} }})
    }
    public async updateList(updateListDto: IUpdateList, listId:number):Promise<void>{
        await this.repository.update(
            { id:listId }, 
            {
                name: updateListDto.name
            }
        )
    }

    public async remove( list:List ):Promise<void>{
            await this.repository.remove(list)
    }
}

export default new ListRepository()