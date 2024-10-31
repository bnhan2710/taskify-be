export interface IUpdateCard {
    title: string,
    description: string,
    listId: number,
}

export function UpdateCardDTO(body: any): IUpdateCard {
    return {
        title: body.title,
        description: body.description,
        listId: body.listId
    }
}