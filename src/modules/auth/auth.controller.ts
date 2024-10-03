//AuthController
import { NextFunction, Request, Response } from 'express';
import AuthService from './auth.service';
import { LoginDTO, RegisterDTO} from './dto';
import { StatusCodes } from 'http-status-codes';
interface CustomRequest extends Request {
    user?: any; 
}

class AuthController {
    public async login(req: Request, res: Response, next : NextFunction){
        const loginDto = LoginDTO(req.body);
        res.status(StatusCodes.OK).json(await AuthService.login(loginDto))
    }
    public async register(req: Request, res: Response, next : NextFunction){
        const registerDto = RegisterDTO(req.body);
        await AuthService.register(registerDto);
        res.send({message: 'Register successfully'});
    }
}

export default new AuthController;