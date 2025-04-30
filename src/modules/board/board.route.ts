import { Router } from 'express';
const BoardRoute: Router = Router();
import { NewBoardValidation, updateBoardValidation } from './validator';
import BoardController from './board.controller';
import asyncHandler from '../../core/middleware/async-handler';
import { authenticate } from '../../core/middleware/authentication-middleware';
import validate from '../../core/middleware/validate';
import { requireBoardPermissions } from '../../core/middleware/auhthorization-board';
import { PermissionEnum } from '../../shared/common/enums/permission';
//CREATE BOARD
BoardRoute.post(
  '/',
  authenticate,
  validate(NewBoardValidation),
  asyncHandler(BoardController.newBoard),
);
//GET MY BOARD
BoardRoute.get('/', authenticate, asyncHandler(BoardController.getMyBoard));

BoardRoute.get('/public', authenticate, asyncHandler(BoardController.getPublicBoard));
//GET BOARD BY ID
BoardRoute.get('/:id', authenticate, asyncHandler(BoardController.getBoardById));
// BoardRoute.get(
//   '/:id',
//   authenticate,
//   requireBoardPermissions([PermissionEnum.CanViewBoard]),
//   asyncHandler(BoardController.getBoardById),
// );
//UPDATE BOARD
BoardRoute.put('/:id', asyncHandler(BoardController.updateBoard));
// BoardRoute.put('/:id',
//     authenticate,
//     requireBoardPermissions([PermissionEnum.CanEditBoard]),
//     validate(updateBoardValidation),
//     asyncHandler(BoardController.updateBoard))
//REMOVE BOARD
BoardRoute.delete(
  '/:id',
  authenticate,
  // requireBoardPermissions([PermissionEnum.CanEditBoard]),
  asyncHandler(BoardController.removeBoard),
);
//INVITE MEMBER
BoardRoute.post(
  '/:id/add',
  authenticate,
  // requireBoardPermissions([PermissionEnum.CanManageBoardMember]),
  asyncHandler(BoardController.inviteMember),
);
//REMOVE MEMBER
BoardRoute.delete(
  '/:id/member/remove',
  authenticate,
  // requireBoardPermissions([PermissionEnum.CanManageBoardMember]),
  asyncHandler(BoardController.removeMember),
);
//CHACNGE ROLE
BoardRoute.put(
  '/:id/member/change-role',
  authenticate,
  // requireBoardPermissions([PermissionEnum.CanManageBoardMember]),
  asyncHandler(BoardController.changeRole),
);

export default BoardRoute;
