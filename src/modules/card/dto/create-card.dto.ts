export interface INewCard{
    title: string;       
    description: string;
    listId: string;
}

export function NewCardDTO(body: any): INewCard {
    return {
        title: body.title,
        description: body.description,
        listId: body.listId
    }
}