import { Router } from "express";
const ListRoute:Router = Router()
import ListController from "./list.controller";
import { isLoggedIn } from "../../middleware/auth.middleware";
import validate from "../../middleware/validate";
import asyncHandler from "../../middleware/asyncHandle"
import { newListValidation , updateListValidation } from "./validator";

//CREATE LIST
ListRoute.post('/', isLoggedIn, validate(newListValidation),asyncHandler(ListController.newList))
//GET LIST
ListRoute.get('/',isLoggedIn,asyncHandler(ListController.getList))
//UPDATE LIST
ListRoute.put('/:id', isLoggedIn , validate(updateListValidation), asyncHandler(ListController.updateList))
//REMOVRE LIST
ListRoute.delete('/:id' , isLoggedIn , asyncHandler(ListController.removeList))

export default ListRoute
