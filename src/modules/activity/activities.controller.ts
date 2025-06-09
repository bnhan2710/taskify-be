import { Request, Response } from 'express';
import ActivitiesService from './activities.service';
import { OK, CREATED } from '../../core/handler/success.reponse';
import { ActivityType } from '../../shared/common/enums/activity';

class ActivitiesController {
  public async getBoardActivityLogs(req: Request, res: Response): Promise<void> {
    const { boardId } = req.params;
    const limit = parseInt(req.query.limit as string) || 50;

    const activityLogs = await ActivitiesService.getBoardActivityLogs(boardId, limit);

    new OK({
      message: 'Activity logs retrieved successfully',
      data: activityLogs,
    }).send(res);
  }

  public async getAllActivityLogs(req: Request, res: Response): Promise<void> {
    const limit = parseInt(req.query.limit as string) || 100;

    const activityLogs = await ActivitiesService.getAllActivityLogs(limit);

    new OK({
      message: 'All activity logs retrieved successfully',
      data: activityLogs,
    }).send(res);
  }

  public async createActivityLog(req: Request, res: Response): Promise<void> {
    const { type, userId, boardId, listId, cardId, metadata } = req.body;

    const activityLog = await ActivitiesService.logActivity({
      type: type as ActivityType,
      userId,
      boardId,
      listId,
      cardId,
      metadata,
    });

    new CREATED({
      message: 'Activity log created successfully',
      data: activityLog,
    }).send(res);
  }
}

export default new ActivitiesController();
