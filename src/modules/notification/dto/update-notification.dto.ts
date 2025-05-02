import { IUpdateNotification } from '../interface';

export function UpdateNotificationDTO(body: any): IUpdateNotification {
  return {
    status: body.status,
  };
}
