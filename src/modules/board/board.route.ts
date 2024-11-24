import { Router } from "express";
const BoardRoute:Router = Router()
import { NewBoardValidation,updateBoardValidation } from "./validator";
import BoardController from "./board.controller";
import asyncHandler from "../../middleware/asyncHandle";
import { checkAuth } from "../../middleware/checkAuth";
import validate from "../../middleware/validate";

//CREATE BOARD
BoardRoute.post('/', checkAuth, validate(NewBoardValidation) ,asyncHandler(BoardController.newBoard))
//GET BOARD BY WORKSPACE
BoardRoute.get('/', checkAuth , asyncHandler(BoardController.getBoardByWorkspace))
//GET BOARD BY ID
// BoardRoute.get('/:id',checkAuth, asyncHandler(BoardController.getBoardById))
BoardRoute.get('/:id', asyncHandler(BoardController.getBoardById))
//UPDATE BOARD
BoardRoute.put('/:id', validate(updateBoardValidation) , asyncHandler(BoardController.updateBoard))
//REMOVE BOARD
BoardRoute.delete('/:id',checkAuth, asyncHandler(BoardController.removeBoard))
//INVITE MEMBER
BoardRoute.post('/:id/member/add',checkAuth, asyncHandler(BoardController.inviteMember))
//REMOVE MEMBER
BoardRoute.delete('/:id/member/remove',checkAuth, asyncHandler(BoardController.removeMember))
//CHACNGE ROLE
BoardRoute.put('/:id/member/change-role',checkAuth, asyncHandler(BoardController.changeRole))

export default BoardRoute