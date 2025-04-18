export interface IPermissionDto {
  permissionName: string;
}

export function CreatePermissionDTO(body: any): IPermissionDto {
  return {
    permissionName: body.name,
  };
}
