import { Repository } from "typeorm";
import connection from "../../configs/database.connect"
import { Card } from "../../orm/entities/Card";
import { List } from "../../orm/entities/List";
import { INewCard, IUpdateCard } from "./dto";
class CardRepository{
    private readonly cardRepository: Repository<Card>
    constructor(){
        this.cardRepository = connection.getRepository(Card)
    }

    public async newCard(newCardDto: INewCard, list: any){
        const newCard = this.cardRepository.create({
            title: newCardDto.title,
            list
        })
        return await this.cardRepository.save(newCard)
    }

    public async getCardByList(listId:number){
        return await this.cardRepository.find({where:{list:{id:listId}}})
    }

    public async getCardById(cardId:number){
        return await this.cardRepository.findOne({where:{id:cardId}})
    }

    public async updateCard(updateCardDto: IUpdateCard, cardId:number){
        await this.cardRepository.update(
            {id:cardId},
            {
                title: updateCardDto.title,
                description: updateCardDto.description
            }
        )
    }
    public async removeCard(card:Card){
        await this.cardRepository.remove(card)
    }

}

export default new CardRepository()