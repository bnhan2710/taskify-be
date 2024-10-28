export interface IUpdateBoard{
    name:string
}

export function UpdateBoardDTO(body:any): IUpdateBoard{
    return {
        name: body.name
    }
}