import { Repository } from "typeorm";
import { List } from "../../database/entities/List";
import connection from "../../core/configs/database.connect";
import { Board } from "../../database/entities/Board";
import { ICreateList ,IUpdateList } from "./interface";
class ListRepository {
    private readonly repository: Repository<List>
    constructor(){
        this.repository = connection.getRepository(List)
    }
    
    public async insert(createListDto: ICreateList, board: Board): Promise<List> {
        let listOrderIds = board.listOrderIds || [];
        const CreateList = this.repository.create({
            title: createListDto.title,
            board,
        });

        const savedList = await this.repository.save(CreateList);
        listOrderIds.push(savedList.id.toString());
        await connection.getRepository(Board).update(board.id, { listOrderIds });
        board.listOrderIds = listOrderIds;
        return savedList;
    }
    public async findById(listId: string): Promise<List | null> {
        return await this.repository.findOne({ where: { id: listId } });
    }

    
    public async getByBoard(boardId:string):Promise<List[]>{
            return await this.repository.find({where: {board:{id:boardId} }})
    }
    public async update(updateListDto: IUpdateList, listId:string):Promise<void>{
        await this.repository.update(
            { id:listId }, 
            {
                title: updateListDto.title,
                cardOrderIds: updateListDto.cardOrderIds
            }
        )
    }

    public async remove( list:List ):Promise<void>{
        await this.repository.remove(list)
}
}
export default new ListRepository()