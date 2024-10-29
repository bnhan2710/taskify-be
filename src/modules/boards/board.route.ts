import { Router } from "express";
const BoardRoute:Router = Router()
import { NewBoardValidation,updateBoardValidation } from "./validator";
import BoardController from "./board.controller";
import asyncHandler from "../../middleware/asyncHandle";
import { isLoggedIn } from "../../middleware/auth.middleware";
import validate from "../../middleware/validate";

//CREATE BOARD
BoardRoute.post('/',isLoggedIn, validate(NewBoardValidation) ,asyncHandler(BoardController.newBoard))
//UPDATE BOARD
BoardRoute.put('/:id', isLoggedIn,validate(updateBoardValidation) , asyncHandler(BoardController.updateBoard))
//GET BOARD BY WORKSPACE
BoardRoute.get('/',isLoggedIn, asyncHandler(BoardController.getBoardByWorkspace))
//REMOVE BOARD
BoardRoute.delete('/:id',isLoggedIn, asyncHandler(BoardController.removeBoard))

export default BoardRoute