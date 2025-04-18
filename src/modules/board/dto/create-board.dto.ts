import { ICreateBoard } from '../interface';

export function NewBoardDTO(body: any): ICreateBoard {
  return {
    title: body.title,
    description: body.description,
    workspaceId: body.workspaceId,
    type: body.type,
  };
}
