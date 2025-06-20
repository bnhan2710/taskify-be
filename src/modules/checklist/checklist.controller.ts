import { Request, Response, NextFunction } from 'express';
import ChecklistService from './checklist.service';
import { OK, CREATED } from '../../core/handler/success.reponse';
import { CreateChecklistDTO, UpdateChecklistDTO } from './dto';
import checklistService from './checklist.service';

class ChecklistController {
  public async newChecklist(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const CreateChecklistDto = CreateChecklistDTO(req.body);
    const userId = req.userJwt?.id;
    await ChecklistService.newChecklist(CreateChecklistDto, userId);
    new CREATED({
      message: 'Create Checklist Successfully',
    }).send(res);
  }

  public async getCheckListbyCard(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const cardId = req.query.cardId as string;
    new OK({
      message: 'Get checklist successfully',
      data: await ChecklistService.getChecklistbyCard(cardId),
    }).send(res);
  }

  public async getChecklistbyId(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const checklistId = req.params.id;
    new OK({
      message: 'Get checklist successfully',
      data: await ChecklistService.getChecklistbyId(checklistId),
    }).send(res);
  }

  public async updateChecklist(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const checklistId = req.params.id;
    const updateChecklistDto = UpdateChecklistDTO(req.body);
    const userId = req.userJwt?.id;
    await checklistService.updateChecklist(updateChecklistDto, checklistId, userId);
    new OK({
      message: 'Update checklist successfully',
    }).send(res);
  }

  public async removeChecklist(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const checklistId = req.params.id;
    const userId = req.userJwt?.id;
    await checklistService.removeChecklist(checklistId, userId);
    new OK({
      message: 'Delete checklist successfully',
    }).send(res);
  }
}

export default new ChecklistController();
