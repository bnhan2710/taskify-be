
export interface INewBoard{
    name:string,
    workspaceId: number
}

export function NewBoardDTO(body:any): INewBoard{
    return {
        name: body.name,
        workspaceId: body.workspaceId
    }
}