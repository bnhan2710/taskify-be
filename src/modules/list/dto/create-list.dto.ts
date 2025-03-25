import { ICreateList } from "../interface";

export function CreateListDTO(body: any): ICreateList {
    return {
        title: body.title,
        boardId: body.boardId
    }
}
