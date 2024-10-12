import { BadRequestError, ConflictRequestError, NotFoundError } from '../../errors/error.response';
import connection from '../../configs/database.connect'
import { Permission } from '../../orm/entities/Permission';
import { Role } from '../../orm/entities/Role';
import { User } from '../../orm/entities/User';
import { IRoleDto , IPermissionDto } from './dto';

class RoleService {

    public async GetRoleofUser(userId: number): Promise<Role[] | null> {
        const user = await connection.getRepository(User).createQueryBuilder('users')
            .leftJoinAndSelect('users.roles', 'roles')
            .where('users.id = :userId', { userId: userId })
            .getOne();
        if(!user){
            throw new NotFoundError('User not found')
        }
        return user?.roles || null

    }    
        
    public async GetPermissionofRole(roleId: number):Promise<Permission[] | null> {
        const role = await connection.getRepository(Role).createQueryBuilder('roles')
            .leftJoinAndSelect('roles.permissions', 'permissions')
            .where('roles.id = :roleId', { roleId: roleId })
            .getOne();
        if(!role){
            throw new NotFoundError('Role not found')
        }
        return role?.permissions || null
    }

    public async CreateRole(createRoleDto:IRoleDto):Promise<void>{
          const existsRole = await connection.getRepository(Role).findOne({where: {name: createRoleDto.roleName}})
         if(existsRole){
                throw new ConflictRequestError('Role name aleardy exists')
         }    
         await connection.getRepository(Role).save({name: createRoleDto.roleName})
    }

    public async CreatePermission(createPermissionDto: IPermissionDto){
        const existsPermission = await connection.getRepository(Permission).findOne({where: {name: createPermissionDto.permissionName}})
        if(existsPermission){
               throw new ConflictRequestError('Permission name aleardy exists')
        }    
        await connection.getRepository(Permission).save({name: createPermissionDto.permissionName})
    }

    public async AssignRoletoUser(userId: number , roleId: number){
        const user = await connection.getRepository(User).findOne({where: {id: userId}})
        if(!user){
            throw new NotFoundError('User not found')
        }
        const role = await connection.getRepository(Role).findOne({where: {id: roleId}})
        if(!role){
            throw new NotFoundError('Role not found')
        }
        user.roles = [role]
        await connection.getRepository(User).save(user)
    }

    public async AssignPermissiontoRole(permissionId: number , roleId:number){
        const permission = await connection.getRepository(Permission).findOne({where: {id: permissionId}})
        if(!permission){
            throw new NotFoundError('Permission not found')
        }
        const role = await connection.getRepository(Role).findOne({where: {id:roleId}})
        if(!role){
            throw new NotFoundError('Role not found')
        }
        role.permissions = [permission]
        await connection.getRepository(Role).save(permission)
}
    public async DeletePermissionfromRole(permissionId: number , roleId:number){
        const permission = await connection.getRepository(Permission).findOne({where: {id: permissionId}})
        if(!permission){
            throw new NotFoundError('Permission not found')
        }
        const role = await connection.getRepository(Role).findOne({where: {id:roleId}})
        if(!role || !role.permissions){
            throw new BadRequestError('Role not found or role has no permission')
        }
        role.permissions = role.permissions.filter(permission => permission.id !== permissionId)
        await connection.getRepository(Role).save(role)
    }

    public async DeletePermission(permissionId:number){
            const permission = await connection.getRepository(Permission).findOne({where:{ id: permissionId}})
            if(!permission){
                throw new NotFoundError('Permission not found')
            }
            await connection.getRepository(Permission).remove(permission)
        }

    public async DeleteRole(roleId: number){
        const role = await connection.getRepository(Role).findOne({where: {id: roleId}})
        if(!role){
            throw new NotFoundError('Role not found')
        }
        await connection.getRepository(Role).remove(role)
    }

}



export default new RoleService