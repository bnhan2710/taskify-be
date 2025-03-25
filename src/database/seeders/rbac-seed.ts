import { Role } from "../entities/Role";
import { Permission } from "../entities/Permission";
import { RoleEnum } from "../../shared/common/enums/role";
import { PermissionEnum } from "../../shared/common/enums/permission";
import  connection  from "../../core/configs/database.connect";

export async function seedRBAC(): Promise<void>  {
    if (!connection.isInitialized) {
        await connection.initialize(); 
      }
    const roleRepo = connection.getRepository(Role)
    const permissionRepo = connection.getRepository(Permission)

    const checkSeederExist = await roleRepo.findOne({where: {name: RoleEnum.OWNER}})
    if(checkSeederExist){
        return
    }

    const roles = [
        {name: RoleEnum.ADMIN},
        {name: RoleEnum.OWNER},
        {name: RoleEnum.GUEST},
        {name: RoleEnum.MEMBER}
    ]
    const permissions = [
        {name: PermissionEnum.CanViewBoard},
        {name: PermissionEnum.CanEditBoard},
        {name: PermissionEnum.CanViewCard},
        {name: PermissionEnum.CanEditCard},
        {name: PermissionEnum.CanManageBoardMember},
        {name: PermissionEnum.CanManageUser},
        {name: PermissionEnum.CanManageRole}
    ]
   await roleRepo.save(roles)
   await permissionRepo.save(permissions)
    const adminRole = await roleRepo.findOne({where: {name: RoleEnum.ADMIN}})
    const ownerRole = await roleRepo.findOne({where: {name: RoleEnum.OWNER}})
    const memberRole = await roleRepo.findOne({where: {name: RoleEnum.MEMBER}})
    const guestRole = await roleRepo.findOne({where: {name: RoleEnum.GUEST}})
    const canViewBoard = await permissionRepo.findOne({where: {name: PermissionEnum.CanViewBoard}})
    const canEditBoard = await permissionRepo.findOne({where: {name: PermissionEnum.CanEditBoard}})
    const canViewCard = await permissionRepo.findOne({where: {name: PermissionEnum.CanViewCard}})
    const canEditCard = await permissionRepo.findOne({where: {name: PermissionEnum.CanEditCard}})
    const manageBoardMember = await permissionRepo.findOne({where: {name: PermissionEnum.CanManageBoardMember}})
    const manageUser = await permissionRepo.findOne({where: {name: PermissionEnum.CanManageUser}})
    const manageRole = await permissionRepo.findOne({where: {name: PermissionEnum.CanManageRole}})
    if(!adminRole || !ownerRole || !memberRole || !guestRole || !canViewBoard || !canEditBoard || !canViewCard || !canEditCard || !manageBoardMember || !manageUser || !manageRole){
        throw new Error('Role or Permission not found')
    }
    adminRole.permissions = [canViewBoard, canEditBoard, canViewCard, canEditCard, manageUser, manageRole]
    ownerRole.permissions = [canViewBoard, canEditBoard, canViewCard, canEditCard, manageBoardMember]
    memberRole.permissions = [canViewBoard, canViewCard ,canEditCard]
    guestRole.permissions = [canViewBoard]
    await roleRepo.save([adminRole, ownerRole, memberRole, guestRole])
}

seedRBAC().then(() => {
    console.log('Authorization seeder executed')
    process.exit(0)
}).catch((err) => {
    console.error(err)
    process.exit(1)
})


