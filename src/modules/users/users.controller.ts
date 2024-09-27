import { Request, Response , NextFunction } from "express";
import UserService from "./users.service"
import { StatusCodes } from "http-status-codes";

class UserController {
    public async getAllUser(req: Request, res: Response, next: NextFunction) {
        res.status(StatusCodes.OK).json(await UserService.getAllUsers())
    }
    public async getUserById(req: Request, res: Response, next: NextFunction) {
        const userId = parseInt(req.params.id);
        res.status(StatusCodes.OK).json(await UserService.getUserById(userId))
    }
    public async createUser(req: Request, res: Response, next: NextFunction) {
        await UserService.createUser(req.body)
        res.status(StatusCodes.CREATED).json({message: 'User created successfully'})
    }
    public async updateUser(req: Request, res: Response, next: NextFunction) {
        const userId = parseInt(req.params.id);
        await UserService.updateUser(userId, req.body)
        res.status(StatusCodes.OK).json({message: 'User updated successfully'})
    }
    public async deleteUser(req: Request, res: Response, next: NextFunction) {
        const userId = parseInt(req.params.id);
        await UserService.deleteUser(userId)
        res.status(StatusCodes.OK).json({message: 'User deleted successfully'})
    }
}

export default new UserController