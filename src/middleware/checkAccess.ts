import { Request ,Response,NextFunction } from "express"
import { ForbiddenError } from "../errors/error.response"
import roleService from "../modules/roles/role.service"

export function canAccessBy(...allowedPermissions: string[]){
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (!req.user || !req.user.id) {
            throw new ForbiddenError('User not authenticated');
        }
        const userId = parseInt(req.user.id)
        const role = await roleService.GetRoleofUser(userId)
        if(!role){
            throw new ForbiddenError('You are not allowed to access this route')
        }
        const permissionArr = await roleService.GetPermissionofRole(role[0].id)
        if(!permissionArr){
            throw new ForbiddenError('You are not allowed to access this route')
        }
        const permissionNames = permissionArr.map(p => p.name)
        console.log(permissionNames)
        if(!allowedPermissions.some(p => permissionNames.includes(p))){
            throw new ForbiddenError('You are not allowed to access this route')
        }
        next()
    }catch(err){
        next(err)
    }
}
}