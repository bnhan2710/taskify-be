import { Repository } from "typeorm";
import connection from "../../core/configs/database.connect"
import { Card } from "../../database/entities/Card";
import { List } from "../../database/entities/List";
import { User } from "../../database/entities/User";
import { IAddMember, ICardRepository, ICreateCard, IUpdateCard } from "./interface";
import { Comment } from "../../database/entities/Comment";
import { ICardDetail } from './interface/index';
class CardRepository implements ICardRepository{
    private readonly repository: Repository<Card>
    constructor(){
        this.repository = connection.getRepository(Card)
    }

    public async insert(newCardDto: ICreateCard, list: List,user: User){
        let cardOrderIds = list.cardOrderIds || [];
        const newCard = this.repository.create({
            title: newCardDto.title,
            list
        })
        const savedCard = await this.repository.save(newCard)
        cardOrderIds.push(savedCard.id.toString())
        await connection.getRepository(List).update(list.id, {cardOrderIds})
        //update table card_member 
        savedCard.member
        await this.repository.save(savedCard)
        return savedCard
    }

    public async getCardByList(listId:string){
        return await this.repository.find({where:{list:{id:listId}}})
    }

    public async findById(cardId:string){
        return await this.repository.findOne({where:{id:cardId}})
    }

    public async getDetail(cardId:string) : Promise<ICardDetail | null>{
        const card = await this.repository.findOne({where:{id:cardId}, relations: ['attachments','comments','checklists','ativityLogs']})
        if(!card){
            return null
        }
        const cardComments = await connection.getRepository(Comment).find({where:{card:{id:cardId}}, relations:['user']})
        const cardMembers = await connection.getRepository(User)
            .createQueryBuilder("user")
            .innerJoin("user.cards", "card", "card.id = :cardId", { cardId })
            .getMany()
        const comments = cardComments.map((comment)=>{
            return {
                id: comment.id,
                content: comment.content,
                createdAt: comment.createdAt,
                user: {
                    id: comment.user.id,
                    displayName: comment.user.displayName || '',
                    avatar: comment.user.avatar || ''
                }
            }
        })

        const memberIds = cardMembers.map((member)=>member.id)
        return {...card, comments, members: memberIds}
    }

    public async update(updateCardDto: IUpdateCard, cardId:string){
        await this.repository.update(
            {id:cardId},
            {
                ...updateCardDto
            })
    }
    
    public async remove(card:Card) :Promise<void>{
        await this.repository.remove(card)
    }

    public async addMember(cardId:string,addMemberDto: IAddMember){
        const card = await this.repository.findOne({where:{id:cardId}, relations:['member']})
        const users = await connection.getRepository(User).findByIds(addMemberDto.userId)
        card?.member?.push(...users)
        await this.repository.update(cardId, {member: card?.member})
    }

}

export default new CardRepository()