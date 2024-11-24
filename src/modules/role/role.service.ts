import { BadRequestError, ConflictRequestError, NotFoundError } from '../../handler/error.response';
import connection from '../../configs/database.connect'
import { Permission } from '../../orm/entities/Permission';
import { Role } from '../../orm/entities/Role';
import { BoardUserRole } from '../../orm/entities/BoardUserRole';
import {updatePermission, updateRole} from './helper/update.helper'
import { IRoleDto , IPermissionDto } from './dto';

class RoleService {

    
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

    public async insertUserBoardRole(userId: string, boardId: string){
        const userRole = await connection.getRepository(BoardUserRole).findOne({where: {userId: userId, boardId: boardId}})
        if(userRole){
            throw new ConflictRequestError('User already has role in board')
        }
        const onwer = await connection.getRepository(Role).findOne({where: {name: 'OWNER'}})
        if(!onwer){
            throw new NotFoundError('Role not found')
        }
        await connection.getRepository(BoardUserRole).save({userId: userId, boardId: boardId, roleId: onwer.id})
    }

    public async changeUserRole(userId: string, boardId: string, roleId: string){
        const userRole = await connection.getRepository(BoardUserRole).findOne({where: {userId: userId, boardId: boardId}})
        if(!userRole){
            throw new NotFoundError('User role not found')
        }
        const role = await connection.getRepository(Role).findOne({where: {id: roleId}})
        if(!role){
            throw new NotFoundError('Role not found')
        }
        await connection.getRepository(BoardUserRole).update({userId: userId, boardId: boardId}, {roleId: roleId})
    }

    public async GetPermissionofRole(roleId: string):Promise<Permission[]> {
        const role = await connection.getRepository(Role).createQueryBuilder('roles')
            .leftJoinAndSelect('roles.permissions', 'permissions')
            .where('roles.id = :roleId', { roleId: roleId })
            .getOne();
        if(!role){
            throw new NotFoundError('Role not found')
        }
        if(!role.permissions){
            throw new NotFoundError('Role has no permission')
        }
        return role.permissions
    }

    public async AssignPermissiontoRole(permissionId: string , roleId:string){
        const permission = await connection.getRepository(Permission).findOne({where: {id: permissionId}})
        if(!permission){
            throw new NotFoundError('Permission not found')
        }
        const role = await connection.getRepository(Role).findOne({where: {id:roleId}})
        if(!role){
            throw new NotFoundError('Role not found')
        }
        if(role.permissions && role.permissions.find(p => p.id === permissionId)){
            throw new BadRequestError('Permission already exists in role')
        }

        await connection.getRepository(Role).createQueryBuilder().relation(Role, 'permissions').of(role).add(permission)
        await updatePermission(roleId)
            
}
    public async DeletePermissionfromRole(permissionId: string , roleId:string){
        const permission = await connection.getRepository(Permission).findOne({where: {id: permissionId}})
        if(!permission){
            throw new NotFoundError('Permission not found')
        }
        const rolePermission = await connection.getRepository(Role).createQueryBuilder('roles')
            .leftJoinAndSelect('roles.permissions', 'permissions')
            .where('roles.id = :roleId', { roleId: roleId })
            .getOne();
        if(!rolePermission){
            throw new NotFoundError('Role not found')
        }
        
        await connection.getRepository(Role).createQueryBuilder().relation(Role, 'permissions').of(rolePermission).remove(permission)
        await updatePermission(roleId)
    }

    public async DeletePermission(permissionId:string){
            const permission = await connection.getRepository(Permission).findOne({where:{ id: permissionId}})
            if(!permission){
                throw new NotFoundError('Permission not found')
            }
            await connection.getRepository(Permission).remove(permission)
        }

    public async DeleteRole(roleId: string){
        const role = await connection.getRepository(Role).findOne({where: {id: roleId}})
        if(!role){
            throw new NotFoundError('Role not found')
        }
        await connection.getRepository(Role).remove(role)
    }
    
}

export default new RoleService