import { Router } from "express";
const ChecklistRoute:Router = Router()
import ChecklistController from "./checklist.controller";
import { createChecklistValidation,updateChecklistValidation } from "./validator";
import validate from "../../middleware/validate";
import asyncHandler from '../../middleware/asyncHandle';
import { isLoggedIn } from "../../middleware/auth.middleware";
//CREATE CHECKLIST
ChecklistRoute.post('/',isLoggedIn,validate(createChecklistValidation), asyncHandler(ChecklistController.newChecklist))
//GET CHECKLIST BY CARD
ChecklistRoute.get('/',isLoggedIn,asyncHandler(ChecklistController.getCheckListbyCard))
//GET CHECKLIST BY ID
ChecklistRoute.get('/:id',isLoggedIn, asyncHandler(ChecklistController.getChecklistbyId))
//UPDATE CHECKLIST
ChecklistRoute.put('/:id', isLoggedIn, validate(updateChecklistValidation),asyncHandler(ChecklistController.updateChecklist))
//DELETE CHECKLIST
ChecklistRoute.delete('/:id', isLoggedIn, asyncHandler(ChecklistController.removeChecklist))
export default ChecklistRoute