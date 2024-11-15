import { Request, Response , NextFunction } from 'express'
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { AuthFailError, ForbiddenError } from '../handler/error.response';
import CacheUtil from "../utils/cache.util"
import { env } from '../configs/env.config';


const secretKey = env.SECRET_KEY as string;

export function isLoggedIn(req: Request, res: Response, next: NextFunction) : void {
        const token = req.header('Authorization')?.replace('Bearer ','')
        if(!token){
           return next(new AuthFailError('You need to login first'));
        }
        jwt.verify(token, secretKey, async (err, decoded) => {
            if (err) {
                return next(new AuthFailError('Token is invalid'));
            }
            req.user = decoded as JwtPayload
            const userCache : any = await CacheUtil.getOneUser(req.user.id)

            if(!userCache || !userCache.permission){
                return next(new AuthFailError('You are not allowed to access'));
            }
            next();
        });
}

export function canAccessBy(...allowedPermissions: string[]){
    return async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
           if(!req.user || !req.user.id){
                return next(new AuthFailError('You need to login to access'));
        }
        const userId = req.user.id
            const userCache : any = await CacheUtil.getOneUser(userId)
        
            if(!userCache || !userCache.permission){
                return next(new AuthFailError('You are not allowed to access'));
            }

            console.log('userCache:',userCache)
            console.log('allowedPermissions:',allowedPermissions)

            const hasPermission = allowedPermissions.some(permission => userCache.permission.includes(permission))
            if(!hasPermission){
                return next(new ForbiddenError(`${userCache.role} is not allowed to access this resource`));
            }
            next()
        }
}

