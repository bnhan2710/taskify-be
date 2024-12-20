import cardRepository from "./card.repository";
import { INewCard, IUpdateCard } from "./dto";
import { Card } from "../../orm/entities/Card";
import { BadRequestError, NotFoundError } from "../../handler/error.response";
import listRepository from "../list/list.repository";
import { AddMemberDto } from './dto/add-member.dto';

class CardService{
    public async newCard(newCardDto: INewCard): Promise<void> {
        const list = await listRepository.findById(newCardDto.listId)
        if(!list){
            throw new NotFoundError('List not found')
        }
         await cardRepository.insert(newCardDto, list)
    }

    public async getCardByList(listId: string): Promise<Card[]> {
        const list = await listRepository.findById(listId)
        if(!list){
            throw new NotFoundError('List not found')
        }
        return await cardRepository.getCardByList(listId)
    }

    public async getDetail(cardId: string): Promise<Card> {
        const card = await cardRepository.getDetail(cardId)
        if(!card){
            throw new NotFoundError('Card not found')
        }
        return card
    }

    public async updateCard(cardId: string, newCardDto: IUpdateCard): Promise<void> {
        const card = await cardRepository.findById(cardId)
        if(!card){
            throw new NotFoundError('Card not found')
        }
        await cardRepository.update(newCardDto, cardId)
    }

    public async removeCard(cardId: string): Promise<void> {
        const card = await cardRepository.findById(cardId)
        if(!card){
            throw new NotFoundError('Card not found')
        }
        await cardRepository.remove(card)
    }

    public async addMember(cardId: string, addMemberDto: AddMemberDto): Promise<void> {
        const card = await cardRepository.findById(cardId)
        if(!card){
            throw new NotFoundError('Card not found')
        }
        await cardRepository.addMember(cardId, addMemberDto)
    }
}

export default new CardService()