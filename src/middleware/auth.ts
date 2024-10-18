

import { Request, Response , NextFunction } from 'express'
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { AuthFailError, ForbiddenError } from '../errors/error.response';
import CacheUtil from "../utils/cache.util"


const secretKey = process.env.SECRET_KEY as string;

export function isLoggedIn(req: Request, res: Response, next: NextFunction): void {
    try{
        const token = req.header('Authorization')?.replace('Bearer ','')
        if(!token){
            throw new AuthFailError('You need to login to access');
        }
        jwt.verify(token, secretKey, async (err, decoded) => {
            if (err) {
                throw new AuthFailError('Token is invalid');
            }
            req.user = decoded as JwtPayload

            const userCache : any = await CacheUtil.getOneUser(req.user.id)

            if(userCache || !userCache.permission){
                throw new AuthFailError('You are not allowed to access');
            }
            next();
        });
    }catch(err){
        next(err)
    }
}

export function canAccessBy(...allowedPermissions: string[]){
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = req.header('Authorization')?.replace('Bearer ','')
        if(!token){
            throw new AuthFailError('You need to login to access');
        }
        jwt.verify(token, secretKey, async (err, decoded) => {
            if (err) {
                throw new AuthFailError('Token is invalid');
            }
            const userCache : any = await CacheUtil.getOneUser(req.user.id)
            if(userCache || !userCache.permission){
                throw new AuthFailError('You are not allowed to access');
            }
            const hasPermission = allowedPermissions.some(permission => userCache.permission.includes(permission))
            if(!hasPermission){
                throw new AuthFailError('You are not allowed to access');
            }
            next()
        });
        next()
    }catch(err){
        next(err)
    }
}
}
