
export interface INewBoard{
    title: string,
    description?: string,
    workspaceId: string
}

export function NewBoardDTO(body:any): INewBoard{
    return {
        title: body.title,
        description: body.description,
        workspaceId: body.workspaceId
    }
}