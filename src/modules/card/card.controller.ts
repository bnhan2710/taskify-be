import CardService from './card.service';
import { Request, Response, NextFunction } from 'express';
import { NewCardDTO, UpdateCardDTO, AddMemberDTO } from './dto';
import { OK, CREATED } from '../../core/handler/success.reponse';

class CardController {
  public async newCard(req: Request, res: Response, _next: NextFunction) {
    const newCardDto = NewCardDTO(req.body);
    const userId = req.userJwt.id;
    const createdCard = await CardService.newCard(newCardDto, userId);
    new CREATED({
      message: 'Create Card Successfully',
      data: createdCard,
    }).send(res);
  }

  public async getCardByList(req: Request, res: Response, _next: NextFunction) {
    const listId = req.query.listId as string;
    new OK({
      message: 'Get Card Successfully',
      data: await CardService.getCardByList(listId),
    }).send(res);
  }

  public async getCardById(req: Request, res: Response, _next: NextFunction) {
    const cardId = req.params.id;
    new OK({
      message: 'Get Card Successfully',
      data: await CardService.getDetail(cardId),
    }).send(res);
  }

  public async updateCard(req: Request, res: Response, _next: NextFunction) {
    const updateCardDto = UpdateCardDTO(req.body);
    const cardId = req.params.id;
    await CardService.updateCard(cardId, updateCardDto);
    new OK({
      message: 'Update Card Successfully',
    }).send(res);
  }

  public async removeCard(req: Request, res: Response, _next: NextFunction) {
    const cardId = req.params.id;
    await CardService.removeCard(cardId);
    new OK({
      message: 'Remove Card Successfully',
    }).send(res);
  }

  public async addMember(req: Request, res: Response, _next: NextFunction) {
    const cardId = req.params.id;
    const addMemberDto = AddMemberDTO(req.body);
    await CardService.addMember(cardId, addMemberDto);
    new OK({
      message: 'Add Member Successfully',
    }).send(res);
  }
}

export default new CardController();
