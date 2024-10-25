export interface INewWorkSpace{
    name: string;
    description?: string;
}

export function NewWorkspaceDTO(body: any): INewWorkSpace {
    return {
        name: body.name,
        description: body.description,
    };
}
