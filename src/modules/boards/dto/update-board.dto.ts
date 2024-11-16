export interface IUpdateBoard{
    title?: string
    description?: string
}

export function UpdateBoardDTO(body:any): IUpdateBoard{
    return {
        title: body.title,
        description: body.description
    }
}