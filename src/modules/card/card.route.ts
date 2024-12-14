import { Router } from "express";
const CardRoute:Router = Router()
import CardController from "./card.controller";
import asyncHandler from '../../middleware/asyncHandle';
import { checkAuth } from "../../middleware/checkAuth";
import validate from '../../middleware/validate';
import { createCardValidation, updateCardValidation } from './validator';

//CREATE CARD
// CardRoute.post('/', checkAuth,validate(createCardValidation) ,asyncHandler(CardController.newCard))
CardRoute.post('/', validate(createCardValidation) ,asyncHandler(CardController.newCard))
//GET CARD BY LIST
// CardRoute.get('/',checkAuth ,asyncHandler(CardController.getCardByList))
CardRoute.get('/' ,asyncHandler(CardController.getCardByList))
//GET DETAIL CARD
CardRoute.get('/:id',checkAuth ,asyncHandler(CardController.getCardById))
//UPDATE CARD
// CardRoute.put('/:id',checkAuth,validate(updateCardValidation) ,asyncHandler(CardController.updateCard))
CardRoute.put('/:id',validate(updateCardValidation) ,asyncHandler(CardController.updateCard))
//REMOVE CARD
CardRoute.delete('/:id',checkAuth, asyncHandler(CardController.removeCard))
//ADD MEMBER TO CARD
CardRoute.post('/:id/member/add',checkAuth,  )
export default CardRoute