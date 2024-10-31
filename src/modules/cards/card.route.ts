import { Router } from "express";
const CardRoute:Router = Router()
import CardController from "./card.controller";
import asyncHandler from '../../middleware/asyncHandle';
import { isLoggedIn } from "../../middleware/auth.middleware";
import validate from '../../middleware/validate';
import { createCardValidation, updateCardValidation } from './validator';

//CREATE CARD
CardRoute.post('/', isLoggedIn,validate(createCardValidation) ,asyncHandler(CardController.newCard))
//GET CARD BY LIST
CardRoute.get('/',isLoggedIn ,asyncHandler(CardController.getCardByList))
//GET CARD BY ID
CardRoute.get('/:id',isLoggedIn ,asyncHandler(CardController.getCardById))
//UPDATE CARD
CardRoute.put('/:id',isLoggedIn,validate(updateCardValidation) ,asyncHandler(CardController.updateCard))
//REMOVE CARD
CardRoute.delete('/:id',isLoggedIn ,asyncHandler(CardController.removeCard))

export default CardRoute