import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AuthFailError, TokenExpiredErr } from '../handler/error.response';
import { env } from '../configs/env.config';
const secretKey = env.SECRET_KEY as string;

export function checkAuth(req: Request, res: Response, next: NextFunction): void {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return next(new AuthFailError('Token not found'));
  }
  jwt.verify(token, secretKey, async (err, decoded) => {
    if (err) {
      return next(new TokenExpiredErr('Token is invalid or expired'));
    }
    req.userJwt = decoded as JwtPayload;
    next();
  });
}
