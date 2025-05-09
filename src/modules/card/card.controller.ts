import cardService from './card.service';
import { Request, Response, NextFunction } from 'express';
import { NewCardDTO, UpdateCardDTO, MemberDTO } from './dto';
import { OK, CREATED } from '../../core/handler/success.reponse';

class CardController {
  public async newCard(req: Request, res: Response, _next: NextFunction) {
    const newCardDto = NewCardDTO(req.body);
    const userId = req.userJwt.id;
    const createdCard = await cardService.newCard(newCardDto, userId);
    new CREATED({
      message: 'Create Card Successfully',
      data: createdCard,
    }).send(res);
  }

  public async getCardByList(req: Request, res: Response, _next: NextFunction) {
    const listId = req.params.listId as string;
    new OK({
      message: 'Get Card Successfully',
      data: await cardService.getCardByList(listId),
    }).send(res);
  }

  public async getCardById(req: Request, res: Response, _next: NextFunction) {
    const cardId = req.params.id;
    new OK({
      message: 'Get Card Successfully',
      data: await cardService.getDetail(cardId),
    }).send(res);
  }

  public async updateCard(req: Request, res: Response, _next: NextFunction) {
    const updateCardDto = UpdateCardDTO(req.body);
    const cardId = req.params.id;
    await cardService.updateCard(cardId, updateCardDto);
    new OK({
      message: 'Update Card Successfully',
    }).send(res);
  }

  public async removeCard(req: Request, res: Response, _next: NextFunction) {
    const cardId = req.params.id;
    await cardService.removeCard(cardId);
    new OK({
      message: 'Remove Card Successfully',
    }).send(res);
  }

  public async addMember(req: Request, res: Response, _next: NextFunction) {
    const cardId = req.params.id;
    const addMemberDto = MemberDTO(req.body);
    await cardService.Member(cardId, addMemberDto);
    new OK({
      message: 'Add Member Successfully',
    }).send(res);
  }
}

export default new CardController();
