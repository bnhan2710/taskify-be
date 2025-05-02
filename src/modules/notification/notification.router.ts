import { authenticate } from './../../core/middleware/authentication-middleware';
import { Router } from 'express';
import notificationController from './notification.controller';
import validate from '../../core/middleware/validate';
import { createNotificationSchema, updateNotificationSchema } from './validator';

const NotificationRoute: Router = Router();
//CREATE NOTIFICATION
NotificationRoute.post(
  '/',
  authenticate,
  validate(createNotificationSchema),
  notificationController.createNotification,
);

//GET NOTIFICATION BY USER
NotificationRoute.get('/me', authenticate, notificationController.getNotificationByUserId);

//UPDATE NOTIFICATION
NotificationRoute.put(
  '/:id',
  authenticate,
  validate(updateNotificationSchema),
  notificationController.updateNotification,
);

export default NotificationRoute;
