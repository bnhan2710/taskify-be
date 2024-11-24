import { Token } from '../../../orm/entities/Token';
import CacheUtil from '../../../utils/cache.util';
import connection from '../../../configs/database.connect'

export async function updatePermission(roleId: string):Promise<void>{
    const listUserLogin = await connection.getRepository(Token).createQueryBuilder('tokens')
        .leftJoinAndSelect('tokens.user', 'user')
        .leftJoinAndSelect('user.roles', 'roles')
        .where('roles.id = :roleId', { roleId: roleId })
        .getMany()

    const userIdArr = listUserLogin.map(u => u.user.id)
    await CacheUtil.setManyUser(userIdArr)
}

export async function updateRole(userId: string):Promise<void>{
    const userIsLoggedIn = await connection.getRepository(Token).createQueryBuilder('tokens')
    .leftJoinAndSelect('tokens.user', 'user')
    .where('user.id = :userId', { userId: userId })
    .getOne()
    if(userIsLoggedIn){
    await CacheUtil.setOneUser(userIsLoggedIn.user.id)
}
}