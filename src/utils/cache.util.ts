import instance from '../configs/redis.config';
import { Role } from '../orm/entities/Role';
import { User } from '../orm/entities/User';
import { Permission } from '../orm/entities/Permission';
import connection from '../configs/database.connect';
const expTime = 60 * 60 * 24 * 30 ; 

class CacheUtil {
    async setOneUser(userId : number) : Promise<void> {
        console.log(`Set cache for user ${userId}`)
        const permissionOfUser = await connection.getRepository(User).createQueryBuilder('users')
            .leftJoinAndSelect('users.roles', 'roles')
            .leftJoinAndSelect('roles.permissions', 'permissions')
            .where('users.id = :userId', { userId: userId })
            .getOne()
        const role = permissionOfUser?.roles
        const permission = role?.map((role: Role) => role.permissions).flat()
        const permissionList = permission?.map(p => p?.name)       
        const roleName = role?.map(r => r?.name)
        await instance.setEx(`user:${userId}`,expTime,JSON.stringify({permission: permissionList , role: roleName}))
    }

    async setManyUser(userArray : User[]) : Promise<void> {
        for(const user of userArray){
            await this.setOneUser(user.id)
        }
    }

    async getOneUser(userId : number) : Promise<Permission[]> {
        const userCache = await instance.get(`user:${userId}`)
        if(userCache){
            return JSON.parse(userCache)
        }
        await this.setOneUser(userId)
        return JSON.parse(await instance.get(`user:${userId}`) || '[]')
    }
}
export default new CacheUtil