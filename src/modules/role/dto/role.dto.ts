export interface IRoleDto {
    roleName: string; 
}

export function CreateRoleDTO(body: any): IRoleDto {
    return {
        roleName: body.name 
    }
}