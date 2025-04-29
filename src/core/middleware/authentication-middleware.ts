import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { AuthFailError, TokenExpiredErr } from '../handler/error.response';
import { env } from '../configs/env.config';
const secretKey = env.SECRET_KEY as string;

export function extractTokenFromHeader(req: Request): string | null {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return null;
  }

  return authHeader.startsWith('Bearer ') ? authHeader.replace('Bearer ', '') : null;
}

export function verifyToken(token: string): Promise<JwtPayload> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err: VerifyErrors | null, decoded: any) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded as JwtPayload);
    });
  });
}

export async function authenticate(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const token = extractTokenFromHeader(req);
    if (!token) {
      return next(new AuthFailError('Token not found'));
    }

    try {
      const decoded = await verifyToken(token);
      req.userJwt = decoded;
      next();
    } catch (error) {
      return next(new TokenExpiredErr('Token is invalid or expired'));
    }
  } catch (error) {
    next(error);
  }
}
