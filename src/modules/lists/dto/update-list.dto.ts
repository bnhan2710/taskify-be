export interface IUpdateList {
    title: string;
}

export function UpdateListDTO(body: any): IUpdateList {
    return {
        title: body.title
    }
}

