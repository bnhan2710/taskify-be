import { Request, Response, NextFunction } from 'express'
import { User } from '../orm/entities/User'
import { Permission } from '../orm/entities/Permission'
import { BoardUserRole } from '../orm/entities/BoardUserRole'
import connection from '../configs/database.connect'
import { ForbiddenError,BadRequestError } from '../handler/error.response'
import cacheUtil from '../utils/cache.util'

export const checkPermissionInBoard = (allowedList: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const isLogeedIn = req.userJwt
        if(!isLogeedIn){
            return next(new ForbiddenError('Authentication failed'))
        }

        const user = await connection.getRepository(User).findOne({where: {id: isLogeedIn.id}})
        if(!user){
            return next(new ForbiddenError('User not found'))
        }

        const boardId = req.body.boardId || req.params.boardId
        const userCache = await cacheUtil.get<string[]>(`board:${boardId}:user:${user.id}`)
        if(!userCache){
            const userInBoard = await connection.getRepository(BoardUserRole).findOne({where: {userId: user.id, boardId}})
            if(!userInBoard){
                return next(new ForbiddenError('You are not allowed to access'))
            }
            const userPermissions = await connection.getRepository(Permission).find({where: {roles: {id: userInBoard.roleId}}})
            const userPermissionList = userPermissions.map(permission => permission.name)
            await cacheUtil.set(`userInBoard${user.id}`, userPermissionList)
            if(allowedList.some(permission => userPermissionList.includes(permission))){
                return next()
            }  
        }
        if(userCache && allowedList.some(permission => userCache.includes(permission))){
            return next()
        }
        return next(new ForbiddenError('You do not have permission to access this resource'))
    }
}

