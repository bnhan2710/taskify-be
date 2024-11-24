import { Router } from "express";
import asyncHandler from "../../middleware/asyncHandle";
import RoleController from "./role.controller";
const router:Router = Router()

//GET PERMISSION OF ROLE
router.get('/permission-of-role/:id' , asyncHandler(RoleController.GetPermissionofRole))
//CREATE ROLE
router.post('/', asyncHandler(RoleController.CreateRole))
//CREATE PERMISSION
router.post('/permission', asyncHandler(RoleController.CreatePermission))
//ASSIGN PERMISSION TO ROLE
router.post('/permission/assign', asyncHandler(RoleController.AssignPermissiontoRole))
//DELETE PERMISSION FROM ROLE
router.delete('/permission-of-role', asyncHandler(RoleController.DeletePermissionfromRole))
//DELETE PERMISSION
router.delete('/permission', asyncHandler(RoleController.DeletePermission))
//DELETE ROLL
router.delete('/', asyncHandler(RoleController.DeleteRole))

export default router
