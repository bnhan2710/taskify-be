import { Request, Response , NextFunction } from "express";
import UserService from "./users.service"
import { StatusCodes } from "http-status-codes";
import { UpdateUserDTO } from "./dto/index";
import { OK } from "../../core/handler/success.reponse";


class UserController {
    public async getMe(req:Request, res: Response, next:NextFunction){
      const id = req.userJwt.id 
      const user = await UserService.getMe(id)
      res.status(StatusCodes.OK).json(user)
    }
    public async getAllUser(req:Request, res: Response , next:NextFunction){
      const users = await UserService.getAll();
      res.status(StatusCodes.OK).json(users)
    } 
    public async getUserById(req:Request, res: Response, next:NextFunction){
      const id = req.params.id
      const user = await UserService.getOneUserById(id);
      res.status(StatusCodes.OK).json(user)
    }
    public async updateUserById(req:Request, res: Response, next:NextFunction){
      const id = req.params.id
      const updateUserDto = UpdateUserDTO(req.body)
     const update = await UserService.updateUserById(id,updateUserDto)
      new OK({
        message: 'Update user successfully',
        data: update
      }).send(res)
    }
    public async deleteUserById(req:Request, res: Response, next:NextFunction){
      const id = req.params.id
      await UserService.deleteUserById(id)
      res.send({message: 'Delete user succesfully!'})
    }
}

export default new UserController