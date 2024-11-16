export interface INewCard{
    title: string;       
    description: string;
    listId: number;
}

export function NewCardDTO(body: any): INewCard {
    return {
        title: body.title,
        description: body.description,
        listId: body.listId
    }
}