export interface ActivityDto {
  userId: string;
  action: string;
  boardId?: string;
  cardId?: string;
}

export function ActivityDTO(body: any): ActivityDto {
  return {
    userId: body.userId,
    action: body.action,
    boardId: body.boardId,
    cardId: body.cardId,
  };
}
