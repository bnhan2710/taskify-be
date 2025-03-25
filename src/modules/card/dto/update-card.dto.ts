import { IUpdateCard } from "../interface";

export function UpdateCardDTO(body: any): IUpdateCard {
    return {
        title: body.title,
        description: body.description,
        listId: body.listId
    }
}