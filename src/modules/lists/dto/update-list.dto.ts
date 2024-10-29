export interface IUpdateList {
    name: string,
}

export function UpdateListDTO(body: any): IUpdateList {
    return {
        name: body.name,
    }
}

