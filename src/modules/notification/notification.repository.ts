import { Repository } from 'typeorm';
import { NotificationEntity } from '../../database/entities/Notification';
import connection from '../../core/configs/database.connect';
import { ICreateNotification, IUpdateNotification, INotificationRepository } from './interface';

export class NotificationRepository implements INotificationRepository {
  private readonly repository: Repository<NotificationEntity>;

  constructor() {
    this.repository = connection.getRepository(NotificationEntity);
  }

  public async insert(newNotificationDto: ICreateNotification): Promise<NotificationEntity> {
    const newNotification = this.repository.create(newNotificationDto);
    return await this.repository.save(newNotification);
  }

  public async getNotificationByUserId(userId: string): Promise<NotificationEntity[]> {
    return await this.repository.find({ where: { userId }, order: { createdAt: 'DESC' } });
  }

  public async findById(notificationId: string): Promise<NotificationEntity | null> {
    return await this.repository.findOne({ where: { id: notificationId } });
  }

  public async update(
    notificationId: string,
    updateNotificationDto: IUpdateNotification,
  ): Promise<void> {
    await this.repository.update(notificationId, updateNotificationDto);
  }
}
