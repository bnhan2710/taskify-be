import { User } from "../../../database/entities/User";
import { Response } from "express";

export interface ICredentials {
    email: string;
    password: string
}

export interface IRegister{
    username: string
    email: string;
    password: string
}


export interface IAuthService {
    login(loginDto: ICredentials,res: Response):Promise<any>;
    googleLogin(user: User):Promise<{accessToken: string} | undefined>
    register(registerDto: IRegister):Promise<void>
    logout(userId: string,res: Response):Promise<void>
    refreshNewToken(resfreshToken: string,res: Response):Promise<{accessToken:string}>
}
