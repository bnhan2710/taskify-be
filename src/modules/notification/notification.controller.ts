import { OK, CREATED } from '../../core/handler/success.reponse';
import { Request, Response, NextFunction } from 'express';
import notificationService from './notification.service';
import { CreateNotificationDTO, UpdateNotificationDTO } from './dto';
class NotificationController {
  public async getNotificationByUserId(req: Request, res: Response, _next: NextFunction) {
    const userId = req.userJwt.id;
    const notifications = await notificationService.getNotificationByUserId(userId);
    new OK({
      message: 'Get Notification Successfully',
      data: notifications,
    }).send(res);
  }

  public async createNotification(req: Request, res: Response, _next: NextFunction) {
    const newNotificationDto = CreateNotificationDTO(req.body);
    const created = await notificationService.createNotification(newNotificationDto);
    new CREATED({
      message: 'Create Notification Successfully',
      data: created,
    }).send(res);
  }

  public async updateNotification(req: Request, res: Response, _next: NextFunction) {
    const notificationId = req.params.id;
    const updateNotificationDto = UpdateNotificationDTO(req.body);
    await notificationService.updateNotification(notificationId, updateNotificationDto);
    new OK({
      message: 'Update Notification Successfully',
    }).send(res);
  }
}

export default new NotificationController();
