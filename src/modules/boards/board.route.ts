import { Router } from "express";
const BoardRoute:Router = Router()
import { NewBoardValidation,updateBoardValidation } from "./validator";
import BoardController from "./board.controller";
import asyncHandler from "../../middleware/asyncHandle";
import { isLoggedIn } from "../../middleware/auth.middleware";
import validate from "../../middleware/validate";

//CREATE BOARD
BoardRoute.post('/',isLoggedIn, validate(NewBoardValidation) ,asyncHandler(BoardController.newBoard))
//GET BOARD BY WORKSPACE
BoardRoute.get('/',isLoggedIn, asyncHandler(BoardController.getBoardByWorkspace))
//GET BOARD BY ID
BoardRoute.get('/:id',isLoggedIn, asyncHandler(BoardController.getBoardById))
//UPDATE BOARD
BoardRoute.put('/:id', isLoggedIn,validate(updateBoardValidation) , asyncHandler(BoardController.updateBoard))
//REMOVE BOARD
BoardRoute.delete('/:id',isLoggedIn, asyncHandler(BoardController.removeBoard))

export default BoardRoute