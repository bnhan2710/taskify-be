import { Router } from "express";
import asyncHandler from "../../middleware/asyncHandle";
import RoleController from "./role.controller";
const router:Router = Router()

//GET ROLE OF USER
router.get('/', asyncHandler(RoleController.GetRoleofUser))
//GET PERMISSION OF ROLE

//CREATE ROLE
router.post('/', asyncHandler(RoleController.CreateRole))
//CREATE PERMISSION
router.post('/permission', asyncHandler(RoleController.CreatePermission))
//ASSIGN ROLE TO USER
router.post('/assign', asyncHandler(RoleController.AssignRoletoUser))
//ASSIGN PERMISSION TO ROLE
router.post('/permission/assign', asyncHandler(RoleController.AssignPermissiontoRole))
//DELETE PERMISSION FROM ROLE
router.delete('/permission-of-role', asyncHandler(RoleController.DeletePermissionfromRole))
//DELETE PERMISSION
router.delete('/permission', asyncHandler(RoleController.DeletePermission))
//DELETE ROLL
router.delete('/', asyncHandler(RoleController.DeleteRole))
export default router