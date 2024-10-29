export interface INewList {
    name: string;
    boardId: number;
}

export function NewListDTO(body: any): INewList {
    return {
        name: body.name,
        boardId: body.boardId
    }
}