import { Router } from "express";
const ListRoute:Router = Router()
import ListController from "./list.controller";
import { checkAuth } from "../../middleware/checkAuth";
import validate from "../../middleware/validate";
import asyncHandler from "../../middleware/asyncHandle"
import { newListValidation , updateListValidation } from "./validator";

//CREATE LIST
// ListRoute.post('/', checkAuth, validate(newListValidation),asyncHandler(ListController.newList))
ListRoute.post('/',validate(newListValidation),asyncHandler(ListController.newList))
//GET LIST
ListRoute.get('/', asyncHandler(ListController.getList))
// ListRoute.get('/',checkAuth, asyncHandler(ListController.getList))
//GET LIST BY ID
ListRoute.get('/:id',checkAuth, asyncHandler(ListController.getListById))
//UPDATE LIST
ListRoute.put('/:id' , validate(updateListValidation), asyncHandler(ListController.updateList))
// ListRoute.put('/:id', checkAuth , validate(updateListValidation), asyncHandler(ListController.updateList))
//REMOVRE LIST
ListRoute.delete('/:id' , checkAuth , asyncHandler(ListController.removeList))

export default ListRoute

