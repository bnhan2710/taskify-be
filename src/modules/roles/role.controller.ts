import {Request, Response ,NextFunction } from "express"
import roleService from "./role.service"
import { CreateRoleDTO , CreatePermissionDTO } from "./dto"
import { StatusCodes } from 'http-status-codes';
import setOneUser from "../../utils/cache.util"
import { isLoggedIn } from '../../middleware/auth';
class RoleController {
    
    public async GetRoleofUser(req: Request , res: Response ,next: NextFunction){
        const userId = parseInt(req.params.id)
        const role = await roleService.GetRoleofUser(userId)
        res.send(role)
    }

    public async GetPermissionofRole(req: Request , res: Response ,next: NextFunction){
        const roleId  = parseInt(req.params.id)
        const permissions = await roleService.GetPermissionofRole(roleId)
        res.send(permissions)
    }

    public async CreateRole(req: Request , res: Response ,next: NextFunction){
        const CreateRoleDto = CreateRoleDTO(req.body)
        await roleService.CreateRole(CreateRoleDto)
        res.status(StatusCodes.CREATED).json({message: 'Create role succesfully'})
    }

    public async CreatePermission(req: Request , res: Response ,next: NextFunction){
        const CreatePermissionDto = CreatePermissionDTO(req.body)
        await roleService.CreatePermission(CreatePermissionDto)
        res.status(StatusCodes.CREATED).json({message: 'Create permission succesfully'})
    }

    public async AssignRoletoUser(req: Request , res: Response ,next: NextFunction){
        const {userId , roleId} = req.body
        await roleService.AssignRoletoUser(userId,roleId)
        const isLoggedIn = req.user.id
        
        res.status(StatusCodes.OK).send({message: 'Assign role to user succesfully'})
    }

    public async AssignPermissiontoRole(req: Request , res: Response ,next: NextFunction){
        const {roleId , permissionId} = req.body
        await roleService.AssignPermissiontoRole(permissionId,roleId)
        res.status(StatusCodes.OK).send({message: 'Assign permission to role succesfully'})
    }

    public async DeletePermissionfromRole(req: Request , res: Response ,next: NextFunction){
        const {roleId , permissionId} = req.body
        await roleService.DeletePermissionfromRole(permissionId,roleId)
        res.status(StatusCodes.OK).send({message: 'Remove permission from role succesfully'})
    }

    public async DeletePermission(req: Request , res: Response ,next: NextFunction){
        const {permissionId} = req.body
        await roleService.DeletePermission(permissionId)
        res.status(StatusCodes.OK).send({message: 'Remove permission succesfully'})
    }

    public async DeleteRole(req: Request , res: Response ,next: NextFunction){
        const {roleId} = req.body
        await roleService.DeleteRole(roleId)
        res.status(StatusCodes.OK).send({message: 'Remove role succesfully'})
    }

}

export default new RoleController

