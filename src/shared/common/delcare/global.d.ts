import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
declare global {
  namespace Express {
    interface Request {
      userJwt: JwtPayload | { id: string };
    }
  }
}
