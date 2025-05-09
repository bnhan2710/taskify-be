import cardRepository from './card.repository';
import { IMember, ICardService, ICreateCard, IUpdateCard } from './interface';
import { Card } from '../../database/entities/Card';
import { BadRequestError, NotFoundError } from '../../core/handler/error.response';
import { ListRepository } from '../list/list.repository';
import userRepository from '../user/user.repository';
import { ICardDetail } from './interface/index';

class CardService implements ICardService {
  private listRepository: ListRepository;
  constructor() {
    this.listRepository = new ListRepository();
  }
  public async newCard(newCardDto: ICreateCard, userId: string): Promise<Card> {
    const list = await this.listRepository.findById(newCardDto.listId);
    if (!list) {
      throw new NotFoundError('List not found');
    }
    const user = await userRepository.findOneById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    const newCard = await cardRepository.insert(newCardDto, list);
    return newCard;
  }

  public async getCardByList(listId: string): Promise<Card[]> {
    const list = await this.listRepository.findById(listId);
    if (!list) {
      throw new NotFoundError('List not found');
    }
    return await cardRepository.getCardByList(listId);
  }

  public async getDetail(cardId: string): Promise<ICardDetail> {
    const card = await cardRepository.getDetail(cardId);
    if (!card) {
      throw new NotFoundError('Card not found');
    }
    return card;
  }

  public async updateCard(cardId: string, newCardDto: IUpdateCard): Promise<void> {
    const card = await cardRepository.findById(cardId);
    if (!card) {
      throw new NotFoundError('Card not found');
    }
    await cardRepository.update(newCardDto, cardId);
  }

  public async removeCard(cardId: string): Promise<void> {
    const card = await cardRepository.findById(cardId);
    if (!card) {
      throw new NotFoundError('Card not found');
    }
    await cardRepository.remove(card);
  }

  public async Member(cardId: string, memberDto: IMember): Promise<void> {
    const card = await cardRepository.findById(cardId);
    if (!card) {
      throw new NotFoundError('Card not found');
    }
    if (memberDto.action === 'add') {
      await cardRepository.addMember(cardId, memberDto.userId);
    } else if (memberDto.action === 'remove') {
      await cardRepository.removeMember(cardId, memberDto.userId);
    }
  }
}

export default new CardService();
