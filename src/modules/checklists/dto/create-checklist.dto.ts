export interface INewChecklist {
    description: string;
    cardId: number;
}

export function CreateChecklistDTO(body:any): INewChecklist {
    return {
        description: body.description,
        cardId: body.cardId
    }
}   