import { Token } from '../../../database/entities/Token';
import CacheUtil from '../../../shared/services/cache.service';
import connection from '../../../core/configs/database.connect'

export async function updatePermission(roleId: string):Promise<void>{
    //update Permission of Role when assign new permission to role
}

export async function updateRole(userId: string):Promise<void>{
    //update Role of User when assign new role to user
}
