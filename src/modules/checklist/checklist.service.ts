import checklistRepository from './checklist.repository';
import { BadRequestError, NotFoundError } from '../../core/handler/error.response';
import { Checklist } from '../../database/entities/Checklist';
import cardRepository from '../card/card.repository';
import { IChecklistService, ICreateChecklist, IUpdateChecklist } from './interface';
import ActivitiesService from '../activity/activities.service';
import { ActivityType } from '../../shared/common/enums/activity';

class ChecklistService implements IChecklistService {
  public async newChecklist(newChecklistDto: ICreateChecklist, userId?: string): Promise<void> {
    const card = await cardRepository.findById(newChecklistDto.cardId);
    if (!card) {
      throw new NotFoundError('Card not found');
    }
    
    await checklistRepository.newChecklist(newChecklistDto, card);
    
    // Log activity
    if (userId) {
      await ActivitiesService.logActivity({
        type: ActivityType.CHECKLIST_CREATED,
        userId,
        boardId: card.list.board.id,
        listId: card.list.id,
        cardId: newChecklistDto.cardId,
        metadata: { checklistDescription: newChecklistDto.description }
      });
    }
  }

  public async getChecklistbyCard(cardId: string): Promise<Checklist[]> {
    const card = await cardRepository.findById(cardId);
    if (!card) {
      throw new NotFoundError('Card not found');
    }
    return await checklistRepository.getCheckListByCard(cardId);
  }

  public async getChecklistbyId(checklistId: string): Promise<Checklist> {
    const checklist = await checklistRepository.getChecklistById(checklistId);
    if (!checklist) {
      throw new NotFoundError('Checklist not found');
    }
    return checklist;
  }

  public async updateChecklist(
    updateChecklistDto: IUpdateChecklist,
    checklistId: string,
    userId?: string
  ): Promise<void> {
    const checklist = await checklistRepository.getChecklistById(checklistId);
    if (!checklist) {
      throw new NotFoundError('Checklist not found');
    }
    
    await checklistRepository.updateChecklist(updateChecklistDto, checklistId);
    
    // Log activity for checking/unchecking items
    if (userId && typeof updateChecklistDto.isDone === 'boolean') {
      const activityType = updateChecklistDto.isDone 
        ? ActivityType.CHECKLIST_ITEM_CHECKED 
        : ActivityType.CHECKLIST_ITEM_UNCHECKED;
        
      await ActivitiesService.logActivity({
        type: activityType,
        userId,
        boardId: checklist.card.list.board.id,
        listId: checklist.card.list.id,
        cardId: checklist.card.id,
        metadata: { 
          checklistDescription: updateChecklistDto.description || checklist.description,
          isDone: updateChecklistDto.isDone
        }
      });
    }
  }

  public async removeChecklist(checklistId: string, userId?: string): Promise<void> {
    const checklist = await checklistRepository.getChecklistById(checklistId);
    if (!checklist) {
      throw new NotFoundError('Checklist not found');
    }
    
    // Log activity before removing
    if (userId) {
      await ActivitiesService.logActivity({
        type: ActivityType.CHECKLIST_DELETED,
        userId,
        boardId: checklist.card.list.board.id,
        listId: checklist.card.list.id,
        cardId: checklist.card.id,
        metadata: { checklistDescription: checklist.description }
      });
    }
    
    await checklistRepository.removeChecklist(checklist);
  }
}

export default new ChecklistService();
