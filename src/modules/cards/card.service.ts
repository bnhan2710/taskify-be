import cardRepository from "./card.repository";
import { INewCard, IUpdateCard } from "./dto";
import { Card } from "../../orm/entities/Card";
import { BadRequestError, NotFoundError } from "../../handler/error.response";
import listRepository from "../lists/list.repository";

class CardService{
    public async newCard(newCardDto: INewCard): Promise<Card> {
        const list = await listRepository.findListById(newCardDto.listId)
        if(!list){
            throw new NotFoundError('List not found')
        }
        return await cardRepository.newCard(newCardDto, list)
    }

    public async getCardByList(listId: number): Promise<Card[]> {
        const list = await listRepository.findListById(listId)
        if(!list){
            throw new NotFoundError('List not found')
        }
        return await cardRepository.getCardByList(listId)
    }

    public async getCardById(cardId: number): Promise<Card> {
        const card = await cardRepository.getCardById(cardId)
        if(!card){
            throw new NotFoundError('Card not found')
        }
        return card
    }

    public async updateCard(cardId: number, newCardDto: IUpdateCard): Promise<void> {
        const card = await cardRepository.getCardById
        if(!card){
            throw new NotFoundError('Card not found')
        }
        await cardRepository.updateCard(newCardDto, cardId)
    }

    public async removeCard(cardId: number): Promise<void> {
        const card = await cardRepository.getCardById(cardId)
        if(!card){
            throw new NotFoundError('Card not found')
        }
        await cardRepository.removeCard(card)
    }

}

export default new CardService()