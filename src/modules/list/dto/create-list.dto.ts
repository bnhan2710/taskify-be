export interface ICreateList {
  title: string;
  boardId: string;
}

export function CreateListDTO(body: any): ICreateList {
  return {
    title: body.title,
    boardId: body.boardId,
  };
}
