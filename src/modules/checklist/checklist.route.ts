import { Router } from "express";
const ChecklistRoute:Router = Router()
import ChecklistController from "./checklist.controller";
import { createChecklistValidation,updateChecklistValidation } from "./validator";
import validate from "../../core/middleware/validate";
import asyncHandler from '../../core/middleware/asyncHandle';
import { checkAuth } from "../../core/middleware/checkAuth";
//CREATE CHECKLIST
ChecklistRoute.post('/',checkAuth,validate(createChecklistValidation), asyncHandler(ChecklistController.newChecklist))
//GET CHECKLIST BY CARD
ChecklistRoute.get('/',checkAuth,asyncHandler(ChecklistController.getCheckListbyCard))
//GET CHECKLIST BY ID
ChecklistRoute.get('/:id',checkAuth, asyncHandler(ChecklistController.getChecklistbyId))
//UPDATE checkAuth
ChecklistRoute.put('/:id', checkAuth, validate(updateChecklistValidation),asyncHandler(ChecklistController.updateChecklist))
//DELETE checkAuth
ChecklistRoute.delete('/:id', checkAuth, asyncHandler(ChecklistController.removeChecklist))
export default ChecklistRoute