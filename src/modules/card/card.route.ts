import { Router } from 'express';
const CardRoute: Router = Router();
import CardController from './card.controller';
import asyncHandler from '../../core/middleware/async-handler';
import { authenticate } from '../../core/middleware/authentication-middleware';
import validate from '../../core/middleware/validate';
import { createCardValidation, updateCardValidation } from './validator';

//CREATE CARD
CardRoute.post(
  '/',
  authenticate,
  validate(createCardValidation),
  asyncHandler(CardController.newCard),
);
//GET CARD BY LIST
// CardRoute.get('/',authenticate ,asyncHandler(CardController.getCardByList))
CardRoute.get('/list/:listId', asyncHandler(CardController.getCardByList));
//GET DETAIL CARD
CardRoute.get('/:id', authenticate, asyncHandler(CardController.getCardById));
//UPDATE CARD
// CardRoute.put('/:id',authenticate,validate(updateCardValidation) ,asyncHandler(CardController.updateCard))
CardRoute.put('/:id', validate(updateCardValidation), asyncHandler(CardController.updateCard));
//REMOVE CARD
CardRoute.delete('/:id', authenticate, asyncHandler(CardController.removeCard));
//ADD MEMBER TO CARD
CardRoute.post('/:id/member/add', authenticate, asyncHandler(CardController.addMember));
export default CardRoute;
