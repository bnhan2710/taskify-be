import { Request } from "express";
import { string } from "joi";
import { JwtPayload } from "jsonwebtoken";
declare global {
    namespace Express {
        interface Request {
            user: JwtPayload | {id:string};
            }
        }
}