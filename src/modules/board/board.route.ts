import { Router } from "express";
const BoardRoute:Router = Router()
import { NewBoardValidation,updateBoardValidation } from "./validator";
import BoardController from "./board.controller";
import asyncHandler from "../../core/middleware/asyncHandle";
import { checkAuth } from "../../core/middleware/checkAuth";
import validate from "../../core/middleware/validate";
import { checkPermissionInBoard } from "../../core/middleware/checkPermission";
import { PermissionEnum } from "../../shared/common/enums/permission";
//CREATE BOARD
BoardRoute.post('/', checkAuth, validate(NewBoardValidation) ,asyncHandler(BoardController.newBoard))
//GET MY BOARD
BoardRoute.get('/', checkAuth , asyncHandler(BoardController.getMyBoard))
//GET BOARD BY ID
BoardRoute.get('/:id', checkAuth, asyncHandler(BoardController.getBoardById))
// BoardRoute.get('/:id', 
//     checkAuth,
//     checkPermissionInBoard([PermissionEnum.CanViewBoard]),
//     asyncHandler(BoardController.getBoardById))
//UPDATE BOARD
BoardRoute.put('/:id',asyncHandler(BoardController.updateBoard))
// BoardRoute.put('/:id',
//     checkAuth,
//     checkPermissionInBoard([PermissionEnum.CanEditBoard]),
//     validate(updateBoardValidation),
//     asyncHandler(BoardController.updateBoard))
//REMOVE BOARD
BoardRoute.delete('/:id',
    checkAuth,
    checkPermissionInBoard([PermissionEnum.CanEditBoard]),
    asyncHandler(BoardController.removeBoard))
//INVITE MEMBER
BoardRoute.post('/:id/add',
    checkAuth,
    checkPermissionInBoard([PermissionEnum.CanManageBoardMember]),
    asyncHandler(BoardController.inviteMember))
//REMOVE MEMBER
BoardRoute.delete('/:id/member/remove',
    checkAuth,
    checkPermissionInBoard([PermissionEnum.CanManageBoardMember]),
    asyncHandler(BoardController.removeMember))
//CHACNGE ROLE
BoardRoute.put('/:id/member/change-role',
    checkAuth,
    checkPermissionInBoard([PermissionEnum.CanManageBoardMember]),
    asyncHandler(BoardController.changeRole))

export default BoardRoute