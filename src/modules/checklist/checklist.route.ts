import { Router } from 'express';
const ChecklistRoute: Router = Router();
import ChecklistController from './checklist.controller';
import { createChecklistValidation, updateChecklistValidation } from './validator';
import validate from '../../core/middleware/validate';
import asyncHandler from '../../core/middleware/async-handler';
import { authenticate } from '../../core/middleware/authentication-middleware';

//CREATE CHECKLIST
ChecklistRoute.post(
  '/',
  authenticate,
  validate(createChecklistValidation),
  asyncHandler(ChecklistController.newChecklist),
);
//GET CHECKLIST BY CARD
ChecklistRoute.get('/', authenticate, asyncHandler(ChecklistController.getCheckListbyCard));
//GET CHECKLIST BY ID
ChecklistRoute.get('/:id', authenticate, asyncHandler(ChecklistController.getChecklistbyId));
//UPDATE authenticate
ChecklistRoute.put(
  '/:id',
  authenticate,
  validate(updateChecklistValidation),
  asyncHandler(ChecklistController.updateChecklist),
);
//DELETE authenticate
ChecklistRoute.delete('/:id', authenticate, asyncHandler(ChecklistController.removeChecklist));
export default ChecklistRoute;
