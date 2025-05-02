import { NotificationRepository } from './notification.repository';
import { BadRequestError, NotFoundError } from '../../core/handler/error.response';
import {
  ICreateNotification,
  INotificationRepository,
  INotificationService,
  IUpdateNotification,
  Notification,
} from './interface';
import connection from '../../core/configs/database.connect';
import { BoardInvitationStatus } from '../../shared/common/enums/board-invitation-status';
import { BoardUserRole } from '../../database/entities/BoardUserRole';
import { Role } from '../../database/entities/Role';
import { RoleEnum } from '../../shared/common/enums/role';

class NotificationService implements INotificationService {
  private notificationRepository: INotificationRepository;
  constructor() {
    this.notificationRepository = new NotificationRepository();
  }
  public async getNotificationByUserId(userId: string): Promise<Notification[]> {
    const notifications = await this.notificationRepository.getNotificationByUserId(userId);
    if (!notifications) {
      throw new NotFoundError('Notification not found');
    }
    return notifications.map((notification) => ({
      id: notification.id,
      message: notification.message,
      status: notification.status,
      userId: notification.userId,
      boardId: notification.boardId,
      createdAt: notification.createdAt,
    }));
  }
  public async createNotification(newNotificationDto: ICreateNotification): Promise<Notification> {
    const newNotification = await this.notificationRepository.insert(newNotificationDto);
    if (!newNotification) {
      throw new BadRequestError('Failed to create notification');
    }
    return newNotification;
  }

  async updateNotification(
    notificationId: string,
    updateNotificationDto: IUpdateNotification,
  ): Promise<void> {
    const notification = await this.notificationRepository.findById(notificationId);
    if (!notification) {
      throw new NotFoundError('Notification not found');
    }

    await this.notificationRepository.update(notificationId, updateNotificationDto);
    const role = await connection.getRepository(Role).findOne({
      where: { name: RoleEnum.MEMBER },
    });
    if (!role) {
      throw new NotFoundError('Role not found');
    }
    if (updateNotificationDto.status === BoardInvitationStatus.ACCEPTED) {
      await connection.getRepository(BoardUserRole).insert({
        boardId: notification.boardId,
        userId: notification.userId,
        roleId: role?.id,
      });
    }
  }
}

export default new NotificationService();
