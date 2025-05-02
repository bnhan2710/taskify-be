import { ICreateNotification } from '../interface';

export function CreateNotificationDTO(body: any): ICreateNotification {
  return {
    message: body.message,
    userId: body.userId,
    boardId: body.boardId,
  };
}
