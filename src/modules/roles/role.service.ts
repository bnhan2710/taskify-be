import { BadRequestError, ConflictRequestError, NotFoundError } from '../../handler/error.response';
import connection from '../../configs/database.connect'
import { Permission } from '../../orm/entities/Permission';
import { Role } from '../../orm/entities/Role';
import { User } from '../../orm/entities/User';
import { Token } from '../../orm/entities/Token';
import CacheUtil from '../../utils/cache.util';
import { IRoleDto , IPermissionDto } from './dto';

class RoleService {

    public async GetRoleofUser(userId: number): Promise<Role[]> {
        const user = await connection.getRepository(User).createQueryBuilder('users')
            .leftJoinAndSelect('users.roles', 'roles')
            .where('users.id = :userId', { userId: userId })
            .getOne();
        if(!user){
            throw new NotFoundError('User not found')
        }
        if(!user.roles){
            throw new NotFoundError('User has no role')
        }
        return user.roles
    }    
        
    public async GetPermissionofRole(roleId: number):Promise<Permission[]> {
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
        const user =  await connection.getRepository(User).findOne({where: {id: userId}})
        if(!user){
            throw new NotFoundError('User not found')
        }
        const role  = await connection.getRepository(Role).findOne({where: {id: roleId}})
        if(!role){
            throw new NotFoundError('Role not found')
        }
        const userIsLoggedIn = await connection.getRepository(Token).createQueryBuilder('tokens')
            .leftJoinAndSelect('tokens.user', 'user')
            .where('user.id = :userId', { userId: userId })
            .getOne()
        if(userIsLoggedIn){
            await CacheUtil.setOneUser(userIsLoggedIn.user.id)
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
        if(role.permissions && role.permissions.find(p => p.id === permissionId)){
            throw new BadRequestError('Permission already exists in role')

        }
        //List user logged in and have role
        const listUserLogin = await connection.getRepository(Token).createQueryBuilder('tokens')
            .leftJoinAndSelect('tokens.user', 'user')
            .leftJoinAndSelect('user.roles', 'roles')
            .where('roles.id = :roleId', { roleId: roleId })
            .getMany()

        if(listUserLogin){
            await CacheUtil.setManyUser(listUserLogin.map(token => token.user))
        }

        await connection.getRepository(Role).createQueryBuilder().relation(Role, 'permissions').of(role).add(permission)
}
    public async DeletePermissionfromRole(permissionId: number , roleId:number){
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