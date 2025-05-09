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

//GET PUBLIC BOARD
BoardRoute.get('/public', authenticate, asyncHandler(BoardController.getPublicBoard));

//GET CLOSED BOARD
BoardRoute.get('/closed', authenticate, asyncHandler(BoardController.getClosedBoard));

//GET BOARD BY ID
BoardRoute.get(
  '/:id',
  authenticate,
  requireBoardPermissions([PermissionEnum.CAN_VIEW_BOARD]),
  asyncHandler(BoardController.getBoardById),
);

//UPDATE BOARD
BoardRoute.put(
  '/:id',
  authenticate,
  requireBoardPermissions([PermissionEnum.CAN_UPDATE_BOARD]),
  validate(updateBoardValidation),
  asyncHandler(BoardController.updateBoard),
);

//REMOVE BOARD
BoardRoute.delete(
  '/:id',
  authenticate,
  requireBoardPermissions([PermissionEnum.CAN_DELETE_BOARD]),
  asyncHandler(BoardController.removeBoard),
);

//INVITE MEMBER
BoardRoute.post(
  '/:id/add',
  authenticate,
  requireBoardPermissions([PermissionEnum.CAN_INVITE_MEMBER]),
  asyncHandler(BoardController.inviteMember),
);

//REMOVE MEMBER
BoardRoute.delete(
  '/:id/member',
  authenticate,
  requireBoardPermissions([PermissionEnum.CAN_REMOVE_MEMBER]),
  asyncHandler(BoardController.removeMember),
);

//CHANGE ROLE
BoardRoute.put(
  '/:id/member/change-role',
  authenticate,
  requireBoardPermissions([PermissionEnum.CAN_INVITE_MEMBER]),
  asyncHandler(BoardController.changeRole),
);

//CLOSE BOARD
BoardRoute.put(
  '/:id/close',
  authenticate,
  requireBoardPermissions([PermissionEnum.CAN_DELETE_BOARD]),
  asyncHandler(BoardController.closeBoard),
);

//REOPEN BOARD
BoardRoute.put(
  '/:id/reopen',
  authenticate,
  requireBoardPermissions([PermissionEnum.CAN_DELETE_BOARD]),
  asyncHandler(BoardController.reopenBoard),
);

export default BoardRoute;
