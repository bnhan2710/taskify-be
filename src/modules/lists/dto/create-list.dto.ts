export interface INewList {
    title:string,
    boardId: number;
}

export function NewListDTO(body: any): INewList {
    return {
        title: body.title,
        boardId: body.boardId
    }
}
