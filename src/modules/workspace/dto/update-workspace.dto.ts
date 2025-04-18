export interface IUpdateWorkspace {
  name: string;
  description: string;
}

export function UpdateWorkspaceDTO(body: any): IUpdateWorkspace {
  return {
    name: body.name,
    description: body.description,
  };
}
