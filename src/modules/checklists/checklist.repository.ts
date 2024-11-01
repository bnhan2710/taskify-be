import { Repository } from "typeorm"
import connection from "../../configs/database.connect"
import { Checklist } from '../../orm/entities/Checklist';
import { Card } from "../../orm/entities/Card";
import { INewChecklist,IUpdateChecklist } from "./dto";
class ChecklistRepository {
    private readonly checkListRepository: Repository<Checklist>
    constructor() {
        this.checkListRepository = connection.getRepository(Checklist)
    }

    public async newChecklist(newChecklistDto: INewChecklist,  card: Card): Promise<void> {
        const checklist = this.checkListRepository.create({
            description: newChecklistDto.description,
            card
        })
        await this.checkListRepository.save(checklist)
    }

    public async getChecklistById(checklistid: number): Promise<Checklist | null> {
        return await this.checkListRepository.findOne({where: {id: checklistid}})
    }

    public async getCheckListByCard(cardId: number): Promise<Checklist[]> {
        return await this.checkListRepository.find({where: {card: { id: cardId }}})
    }

    public async updateChecklist(updateChecklistDto: IUpdateChecklist, checklistId:number):Promise<void>{
        await this.checkListRepository.update(
            {id:checklistId},
            {
                description: updateChecklistDto.description,
                isDone: updateChecklistDto.isDone
            }
        )
    }

    public async removeChecklist(checklist:Checklist):Promise<void>{
            await this.checkListRepository.remove(checklist)
    }
}

export default new ChecklistRepository()