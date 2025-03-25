import { IUpdateList } from "../interface";

export function UpdateListDTO(body: any): IUpdateList {
    return {
        title: body.title,
        cardOrderIds: body.cardOrderIds
    }
}

