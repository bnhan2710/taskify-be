export interface IUpdateList {
    title?: string;
    cardOrderIds?: string[]
}

export function UpdateListDTO(body: any): IUpdateList {
    return {
        title: body.title,
        cardOrderIds: body.cardOrderIds
    }
}

