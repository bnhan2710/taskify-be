import { Repository } from "typeorm";
import connection from "../../configs/database.connect"
import { Card } from "../../orm/entities/Card";
import { List } from "../../orm/entities/List";
import { User } from "../../orm/entities/User";
import { AddMemberDto, INewCard, IUpdateCard } from "./dto";
class CardRepository{
    private readonly repository: Repository<Card>
    constructor(){
        this.repository = connection.getRepository(Card)
    }

    public async insert(newCardDto: INewCard, list: List){
        let cardOrderIds = list.cardOrderIds || [];
        const newCard = this.repository.create({
            title: newCardDto.title,
            list
        })
        const savedCard = await this.repository.save(newCard)
        cardOrderIds.push(savedCard.id.toString())
        await connection.getRepository(List).update(list.id, {cardOrderIds})
        return savedCard
    }

    public async getCardByList(listId:string){
        return await this.repository.find({where:{list:{id:listId}}})
    }

    public async findById(cardId:string){
        return await this.repository.findOne({where:{id:cardId}})
    }

    public async getDetail(cardId:string){
        return await this.repository.findOne({where:{id:cardId}, relations: ['attachments','comments','checklists','ativityLogs','member']})
    }

    public async update(updateCardDto: IUpdateCard, cardId:string){
        await this.repository.update(
            {id:cardId},
            {
                ...updateCardDto
            })
    }
    
    public async remove(card:Card){
        await this.repository.remove(card)
    }

    public async addMember(cardId:string,addMemberDto: AddMemberDto){
        const card = await this.repository.findOne({where:{id:cardId}, relations:['member']})
        const users = await connection.getRepository(User).findByIds(addMemberDto.userId)
        card?.member?.push(...users)
        await this.repository.update(cardId, {member: card?.member})
    }

}

export default new CardRepository()