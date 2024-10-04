

import { Request, Response , NextFunction } from 'express'
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { AuthFailError } from '../errors/error.response';


const secretKey = process.env.SECRET_KEY as string;

export function AuthToken(req: Request, res: Response, next: NextFunction): void {
    const token = req.header('Authorization')?.replace('Bearer ','')
    if(!token){
        throw new AuthFailError('You need to login to access');
    }
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            throw new AuthFailError('Token is invalid');
        }
        req.user.id = (user as JwtPayload).id;
        next();
    });
}