export interface INewChecklist {
    description: string;
    cardId: string;
}

export function CreateChecklistDTO(body:any): INewChecklist {
    return {
        description: body.description,
        cardId: body.cardId
    }
}   