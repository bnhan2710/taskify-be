import { Repository } from "typeorm";
import connection from "../../configs/database.connect"
import { Card } from "../../orm/entities/Card";
import { List } from "../../orm/entities/List";
import { INewCard, IUpdateCard } from "./dto";
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
    }

    public async getCardByList(listId:string){
        return await this.repository.find({where:{list:{id:listId}}})
    }

    public async findById(cardId:string){
        return await this.repository.findOne({where:{id:cardId}})
    }

    public async update(updateCardDto: IUpdateCard, cardId:string){
        await this.repository.update(
            {id:cardId},
            {
                title: updateCardDto.title,
                description: updateCardDto.description,
                list: { id: updateCardDto.listId}
            }
        )
    }
    public async remove(card:Card){
        await this.repository.remove(card)
    }

}

export default new CardRepository()