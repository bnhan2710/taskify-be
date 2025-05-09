import { Repository } from 'typeorm';
import connection from '../../core/configs/database.connect';
import { Card } from '../../database/entities/Card';
import { ListEntity } from '../../database/entities/List';
import { User } from '../../database/entities/User';
import { ICardRepository, ICreateCard, IUpdateCard } from './interface';
import { Comment } from '../../database/entities/Comment';
import { ICardDetail } from './interface/index';
import { BadRequestError, NotFoundError } from '../../core/handler/error.response';
class CardRepository implements ICardRepository {
  private readonly repository: Repository<Card>;
  constructor() {
    this.repository = connection.getRepository(Card);
  }

  public async insert(newCardDto: ICreateCard, list: ListEntity) {
    const cardOrderIds = list.cardOrderIds || [];
    const newCard = this.repository.create({
      title: newCardDto.title,
      list,
    });
    const savedCard = await this.repository.save(newCard);
    cardOrderIds.push(savedCard.id.toString());
    await connection.getRepository(ListEntity).update(list.id, { cardOrderIds });
    //update table card_member
    await this.repository.save(savedCard);
    return savedCard;
  }

  public async getCardByList(listId: string) {
    return await this.repository.find({
      where: { list: { id: listId } },
      relations: ['attachments', 'comments', 'checklists', 'activityLogs'],
    });
  }

  public async findById(cardId: string) {
    return await this.repository.findOne({ where: { id: cardId } });
  }

  public async getDetail(cardId: string): Promise<ICardDetail | null> {
    const card = await this.repository.findOne({
      where: { id: cardId },
      relations: ['attachments', 'comments', 'checklists', 'activityLogs'],
      order: {
        comments: { createdAt: 'DESC' },
      },
    });
    if (!card) {
      return null;
    }
    const cardComments = await connection
      .getRepository(Comment)
      .find({ where: { card: { id: cardId } }, relations: ['user'] });
    const cardMembers = await connection
      .getRepository(User)
      .createQueryBuilder('user')
      .innerJoin('user.cards', 'card', 'card.id = :cardId', { cardId })
      .getMany();
    const comments = cardComments.map((comment) => {
      return {
        id: comment.id,
        content: comment.content,
        createdAt: comment.createdAt,
        user: {
          id: comment.user.id,
          displayName: comment.user.displayName || '',
          avatar: comment.user.avatar || '',
        },
      };
    });

    const memberIds = cardMembers.map((member) => member.id);
    return { ...card, comments, members: memberIds };
  }

  public async update(updateCardDto: IUpdateCard, cardId: string) {
    await this.repository.update(
      { id: cardId },
      {
        title: updateCardDto.title,
        description: updateCardDto.description,
        list: { id: updateCardDto.listId },
      },
    );
  }

  public async remove(card: Card): Promise<void> {
    await this.repository.remove(card);
  }

  public async addMember(cardId: string, userId: string): Promise<void> {
    const user = await connection.getRepository(User).findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundError('User not found');
    }
    const card = await this.repository.findOne({ where: { id: cardId }, relations: ['member'] });
    if (!card) {
      throw new NotFoundError('Card not found');
    }
    if (card.member?.some((member) => member.id === user.id)) {
      throw new BadRequestError('User already in card');
    }
    if (!card.member) {
      card.member = [];
    }
    card.member.push(user);
    await this.repository.save(card);
  }

  public async removeMember(cardId: string, userId: string): Promise<void> {
    const user = await connection.getRepository(User).findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundError('User not found');
    }
    const card = await this.repository.findOne({ where: { id: cardId }, relations: ['member'] });
    if (!card) {
      throw new NotFoundError('Card not found');
    }
    if (!card.member?.some((member) => member.id === user.id)) {
      throw new BadRequestError('User not in card');
    }
    card.member = card.member.filter((member) => member.id !== user.id);
    await this.repository.save(card);
  }
}
export default new CardRepository();
