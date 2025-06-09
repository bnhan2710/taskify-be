import cardRepository from './card.repository';
import { IMember, ICardService, ICreateCard, IUpdateCard } from './interface';
import { Card } from '../../database/entities/Card';
import { BadRequestError, NotFoundError } from '../../core/handler/error.response';
import { ListRepository } from '../list/list.repository';
import userRepository from '../user/user.repository';
import { ICardDetail } from './interface/index';
import ActivitiesService from '../activity/activities.service';
import { ActivityType } from '../../shared/common/enums/activity';

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
    const card = await cardRepository.insert(newCardDto, list, user);
    // Log activity
    if (userId) {
      await ActivitiesService.logActivity({
        type: ActivityType.CARD_CREATED,
        userId,
        boardId: list.board.id,
        listId: newCardDto.listId,
        cardId: card.id,
        metadata: { cardTitle: card.title },
      });
    }

    return card;
  }

  public async getCardByList(listId: string): Promise<Card[]> {
    const list = await this.listRepository.findById(listId);
    if (!list) {
      throw new NotFoundError('List not found');
    }
    const cards = await cardRepository.getCardByList(listId);
    return cards;
  }

  public async getDetail(cardId: string): Promise<ICardDetail> {
    const card = await cardRepository.getDetail(cardId);
    if (!card) {
      throw new NotFoundError('Card not found');
    }
    return card;
  }

  public async updateCard(cardId: string, newCardDto: IUpdateCard, userId?: string): Promise<void> {
    const card = await cardRepository.findById(cardId);
    if (!card) {
      throw new NotFoundError('Card not found');
    }
    await cardRepository.update(newCardDto, cardId);

    // Log activity
    if (userId) {
      await ActivitiesService.logActivity({
        type: ActivityType.CARD_UPDATED,
        userId,
        boardId: card.list.board.id,
        listId: newCardDto.listId,
        cardId: cardId,
        metadata: {
          cardTitle: newCardDto.title || card.title,
          changes: newCardDto,
        },
      });
    }
  }

  public async removeCard(cardId: string, userId?: string): Promise<void> {
    const card = await cardRepository.findById(cardId);
    if (!card) {
      throw new NotFoundError('Card not found');
    }

    // Log activity before removing
    if (userId) {
      await ActivitiesService.logActivity({
        type: ActivityType.CARD_DELETED,
        userId,
        boardId: card.list.board.id,
        listId: card.list.id,
        cardId: cardId,
        metadata: { cardTitle: card.title },
      });
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
