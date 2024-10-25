//AuthController
import { NextFunction, Request, Response } from 'express';
import AuthService from './auth.service';
import { LoginDTO, RegisterDTO} from './dto';
import { StatusCodes } from 'http-status-codes';
import { OK , CREATED } from '../../handler/success.reponse';
class AuthController {

    public async login(req: Request, res: Response, next : NextFunction){
        const loginDto = LoginDTO(req.body);
        new OK({
            message: 'Login successfully',
            data: await AuthService.login(loginDto)
        }).send(res);
    }
    
    public async register(req: Request, res: Response, next : NextFunction){
        const registerDto = RegisterDTO(req.body);
        await AuthService.register(registerDto);
        new CREATED({
            message: 'Register successfully'
        }).send(res);
    }
    public async logout(req:Request, res:Response, next: NextFunction){
        const userId = req.user.id
        await AuthService.logout(userId)
        res.send({message: 'Logout successfully'})
    }
}

export default new AuthController;