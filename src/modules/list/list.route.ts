import { Router } from "express";
const ListRoute:Router = Router()
import ListController from "./list.controller";
import { checkAuth } from "../../middleware/checkAuth";
import validate from "../../middleware/validate";
import asyncHandler from "../../middleware/asyncHandle"
import { newListValidation , updateListValidation } from "./validator";
import { checkPermissionInBoard } from "../../middleware/checkPermission";
import { PermissionEnum } from "../../common/enums/permission";

//CREATE LIST
ListRoute.post('/', validate(newListValidation),asyncHandler(ListController.newList))
// ListRoute.post('/',
//     checkAuth,
//     checkPermissionInBoard([PermissionEnum.CanEditBoard]),
//     validate(newListValidation),
//     asyncHandler(ListController.newList))
//GET LIST
// ListRoute.get('/',checkAuth, asyncHandler(ListController.getList))
ListRoute.get('/',checkAuth, asyncHandler(ListController.getList))
//GET LIST BY ID
ListRoute.get('/:id',checkAuth, asyncHandler(ListController.getListById))
// UPDATE LIST
// ListRoute.put('/:id',
//     checkAuth,
//     checkPermissionInBoard([PermissionEnum.CanEditBoard]),
//     validate(updateListValidation),
//     asyncHandler(ListController.updateList))
ListRoute.put('/:id', validate(updateListValidation), asyncHandler(ListController.updateList))
//REMOVRE LIST
// ListRoute.delete('/:id',
//     checkAuth,
//     checkPermissionInBoard([PermissionEnum.CanEditBoard]),
//     asyncHandler(ListController.removeList))
ListRoute.delete('/:id', asyncHandler(ListController.removeList))

export default ListRoute

