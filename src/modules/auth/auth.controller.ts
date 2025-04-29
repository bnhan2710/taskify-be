//AuthController
import { NextFunction, Request, Response } from 'express';
import AuthService from './auth.service';
import { LoginDTO, RegisterDTO, ChangePasswordDTO } from './dto';
import { OK, CREATED } from '../../core/handler/success.reponse';
class AuthController {
  public async login(req: Request, res: Response, _next: NextFunction) {
    const loginDto = LoginDTO(req.body);
    new OK({
      message: 'Login successfully',
      data: await AuthService.login(loginDto, res),
    }).send(res);
  }

  public async register(req: Request, res: Response, _next: NextFunction) {
    const registerDto = RegisterDTO(req.body);
    await AuthService.register(registerDto);
    new CREATED({
      message: 'Register successfully',
    }).send(res);
  }
  public async logout(req: Request, res: Response, _next: NextFunction) {
    const userId = req.userJwt.id;
    await AuthService.logout(userId, res);
    res.send({ message: 'Logout successfully' });
  }

  public async changePassword(req: Request, res: Response, _next: NextFunction) {
    const userId = req.userJwt.id;
    const changePasswordDto = ChangePasswordDTO(req.body);
    await AuthService.changePassword(userId, changePasswordDto);
    new OK({
      message: 'Change password successfully',
    }).send(res);
  }

  public async googleLogin(req: Request, res: Response, _next: NextFunction) {
    new OK({
      message: 'Login successfully',
      data: await AuthService.googleLogin(req.user as any),
    }).send(res);
  }

  public async refreshNewToken(req: Request, res: Response, _next: NextFunction) {
    const { refreshToken } = req.cookies;
    new OK({
      message: 'refreshNewToken success',
      data: await AuthService.refreshNewToken(refreshToken, res),
    }).send(res);
  }
}

export default new AuthController();
