import { Attachment } from '../../../database/entities/Attachment';
import { Card } from '../../../database/entities/Card';
import { Checklist } from '../../../database/entities/Checklist';
import { User } from '../../../database/entities/User';
import { ListEntity } from '../../../database/entities/List';
// import { ActivityLog } from "../../../database/entities/Activity_Log";

export interface ICreateCard {
  title: string;
  description: string;
  listId: string;
}

export interface IUpdateCard {
  title?: string;
  description?: string;
  listId: string;
}

export interface IMember {
  userId: string;
  action: 'add' | 'remove';
}

type CommentType = {
  id: string;
  content: string;
  createdAt: Date;
  user: {
    id: string;
    displayName: string;
    avatar: string;
  };
};

export interface ICardDetail {
  id: string;
  attachments: Attachment[];
  comments: CommentType[];
  checklists: Checklist[];
  // activityLogs: ActivityLog[];
  members: string[];
}

export interface ICardService {
  newCard(newCardDto: ICreateCard, userId: string): Promise<Card>;
  getCardByList(listId: string): Promise<Card[]>;
  getDetail(cardId: string): Promise<ICardDetail>;
  updateCard(cardId: string, newCardDto: IUpdateCard): Promise<void>;
  removeCard(cardId: string): Promise<void>;
  Member(cardId: string, addMemberDto: IMember): Promise<void>;
}

export interface ICardRepository {
  insert(newCardDto: ICreateCard, list: ListEntity, user: User): Promise<Card>;
  getCardByList(listId: string): Promise<Card[]>;
  findById(cardId: string): Promise<Card | null>;
  getDetail(cardId: string): Promise<ICardDetail | null>;
  update(newCardDto: IUpdateCard, cardId: string): Promise<void>;
  remove(card: Card): Promise<void>;
  addMember(cardId: string, userId: string): Promise<void>;
  removeMember(cardId: string, userId: string): Promise<void>;
}
