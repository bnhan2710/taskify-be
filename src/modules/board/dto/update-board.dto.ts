import { IUpdateBoard } from '../interface';

export function UpdateBoardDTO(body: any): IUpdateBoard {
  return {
    title: body.title,
    description: body.description,
    listOrderIds: body.listOrderIds,
    type: body.type,
  };
}
