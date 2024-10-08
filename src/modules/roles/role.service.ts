import { Permission } from '../../orm/entities/Permission';


class RoleService {

    public async GetRoleofUser(userId: number) {

    }

    public async GetPermissonofRole(roleId: number){

    }

    public async CreateRole(RoleName: string){
          
    }

    public async CreatePermisson(PermissionName: string){

    }

    public async AssignRoletoUser(userId: number , roleId: number){

    }

    public async AssignPermissiontoRole(permissionId: number , roleId:number){

    }

    public async DeletePermissionfromRole(permissonId: number , roleId:number){

    }

    public async DeletePermisson(permissonId:number){

    }

    public async DeleteRole(roleId: number){

    }

}



export default new RoleService