import { Request, Response, NextFunction } from 'express';
import authController from '../src/modules/auth/auth.controller';
import AuthService from '../src/modules/auth/auth.service';
import { LoginDTO } from '../src/modules/auth/dto';

jest.mock('../src/modules/auth/auth.service'); 

describe('AuthController', () => {
  describe('login', () => {
    it('should return a token on successful login', async () => {
      const req = {
        body: {
          username: 'test123',
          password: '12345',
        },
      } as Request;

      const res = {
        send: jest.fn(),
      } as unknown as Response;

      const next = jest.fn() as NextFunction;

      const mockLoginResponse = { token: 'mockToken' };
      (AuthService.login as jest.Mock).mockResolvedValue(mockLoginResponse); 

      await authController.login(req, res, next); 

      expect(res.send).toHaveBeenCalledWith({
        message: 'Login successfully',
        data: mockLoginResponse,
      });
    });
  });
});
