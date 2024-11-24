import instance from '../configs/redis.config';
import { Role } from '../orm/entities/Role';
import { User } from '../orm/entities/User';
import { Permission } from '../orm/entities/Permission';
import connection from '../configs/database.connect';
const expTime = 60 * 60 * 24 * 30 ; 

class CacheUtil {
    async setOneUser(userId : string) : Promise<void> {
        // console.log(`Set cache for user ${userId}`)
        // const user = await connection.getRepository(User).findOne({ where: { id: userId }, relations: ['roles'] });
        // if(!user || !user.roles){
        //     return
        // }
        // if(user.roles.length === 0){
        //     return
        // }
        // const permission = await connection.getRepository(Permission).find({ where: { roles: user.roles } });
        // console.log(permission)
        // const permissionList = permission.map(p => p.name);
        // const roleName = user.roles.map(r => r.name).join(',');
        // await instance.set(`user:${userId}`, JSON.stringify({permission: permissionList, role: roleName}), { EX: expTime })
    }

    async setManyUser(userArray : string[]) : Promise<void> {
        for (const userId of userArray) {
            await this.setOneUser(userId)
        }
    }

    async getOneUser(userId : string) : Promise<Permission[]> {
        // console.log(`Get cache for user ${userId}`)
        const userCache = await instance.get(`user:${userId}`)
        if(userCache){
            return JSON.parse(userCache)
        }
        await this.setOneUser(userId)
        return JSON.parse(await instance.get(`user:${userId}`) || '[]')
    }
}

export default new CacheUtil