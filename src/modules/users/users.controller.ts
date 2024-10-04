import { Request, Response , NextFunction } from "express";
import UserService from "./users.service"
import { StatusCodes } from "http-status-codes";
import { UpdateUserDTO } from "./dto/index";


class UserController {
    public async getMe(req:Request, res: Response, next:NextFunction){
      const id = parseInt(req.user.id)
      const user = await UserService.getMe(id)
      res.status(StatusCodes.OK).json(user)
    }
    public async getAllUser(req:Request, res: Response , next:NextFunction){
      const users = await UserService.getAll();
      res.status(StatusCodes.OK).json(users)
    } 
    public async getUserById(req:Request, res: Response, next:NextFunction){
      const id = parseInt(req.params.id)
      const user = await UserService.getOneUserById(id);
      res.status(StatusCodes.OK).json(user)
    }
    public async updateUserById(req:Request, res: Response, next:NextFunction){
      const id = parseInt(req.params.id)
      const updateUserDto = UpdateUserDTO(req.body)
      await UserService.updateOneUserById(id,updateUserDto)
      res.send({message:'Update info succesfully!'})
    }
    public async deleteUserById(req:Request, res: Response, next:NextFunction){
      const id = parseInt(req.params.id)
      await UserService.deleteUserById(id)
      res.send({message: 'Delete user succesfully!'})
    }
}

export default new UserController