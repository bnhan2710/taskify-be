export interface UpdateWorkspaceDto {
    name: string;
    description: string;
}

export function UpdateWorkspaceDTO(body: any): UpdateWorkspaceDto {
    return {
        name: body.name,
        description: body.description,
    };
}
