import { BoardInvitationStatus } from 'src/shared/common/enums/board-invitation-status';
import { NotificationEntity } from '../../../database/entities/Notification';

export interface ICreateNotification {
  message: string;
  userId: string;
  boardId: string;
}

export interface IUpdateNotification {
  status: BoardInvitationStatus;
}

export interface Notification {
  id: string;
  message: string;
  status: string;
  userId: string;
  boardId: string;
  createdAt: Date;
}

export interface INotificationService {
  createNotification(newNotificationDto: ICreateNotification): Promise<Notification>;
  getNotificationByUserId(userId: string): Promise<Notification[]>;
  updateNotification(
    notificationId: string,
    updateNotificationDto: IUpdateNotification,
  ): Promise<void>;
}

export interface INotificationRepository {
  insert(newNotificationDto: ICreateNotification): Promise<NotificationEntity>;
  getNotificationByUserId(userId: string): Promise<NotificationEntity[]>;
  findById(notificationId: string): Promise<NotificationEntity | null>;
  update(notificationId: string, updateNotificationDto: IUpdateNotification): Promise<void>;
}
