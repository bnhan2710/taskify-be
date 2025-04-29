import { Router } from 'express';
const ListRoute: Router = Router();
import ListController from './list.controller';
import { authenticate } from '../../core/middleware/authentication-middleware';
import validate from '../../core/middleware/validate';
import asyncHandler from '../../core/middleware/async-handler';
import { CreateListValidation, updateListValidation } from './validator';
import { requireBoardPermissions } from '../../core/middleware/auhthorization-board';
import { PermissionEnum } from '../../shared/common/enums/permission';

//CREATE LIST
ListRoute.post('/', validate(CreateListValidation), asyncHandler(ListController.CreateList));
// ListRoute.post('/',
//     authenticate,
//     requireBoardPermissions([PermissionEnum.CanEditBoard]),
//     validate(CreateListValidation),
//     asyncHandler(ListController.CreateList))
//GET LIST
// ListRoute.get('/',authenticate, asyncHandler(ListController.getList))
ListRoute.get('/', authenticate, asyncHandler(ListController.getList));
//GET LIST BY ID
ListRoute.get('/:id', authenticate, asyncHandler(ListController.getListById));
// UPDATE LIST
// ListRoute.put('/:id',
//     authenticate,
//     requireBoardPermissions([PermissionEnum.CanEditBoard]),
//     validate(updateListValidation),
//     asyncHandler(ListController.updateList))
ListRoute.put('/:id', validate(updateListValidation), asyncHandler(ListController.updateList));
//REMOVRE LIST
//  ListRoute.delete('/:id',
//     authenticate,
//     requireBoardPermissions([PermissionEnum.CanEditBoard]),
//     asyncHandler(ListController.removeList))
ListRoute.delete('/:id', asyncHandler(ListController.removeList));

export default ListRoute;
