export interface INewCard{
    title: string;       
    listId: number;
}

export function NewCardDTO(body: any): INewCard {
    return {
        title: body.title,
        listId: body.listId
    }
}