import { NextFunction,Request, Response } from 'express';
import { CREATED,OK } from '../../handler/success.reponse';
import activitiesService from './activities.service';

class ActivitiesController {
    public async getActivities(req: Request, res: Response , next: NextFunction): Promise<void> {
        const activities = await activitiesService.getActivities();
        new OK({
            message: 'Activities fetched successfully',
            data: activities
        }).send(res);
    }

    public async getActivityById(req: Request, res: Response): Promise<void> {
        const activity = await activitiesService.getActivityById(req.params.id);
        new OK({
            message: 'Activity fetched successfully',
            data: activity
        }).send(res);
    }

    public async getActivityByBoardId(req: Request, res: Response): Promise<void> {
        const activities = await activitiesService.getActivityByBoardId(req.params.boardId);
        new OK({
            message: 'Activities fetched successfully',
            data: activities
        }).send(res);
    }

    public async getActivityByCard(req: Request, res: Response): Promise<void> {
        const activities = await activitiesService.getActivityByCard(req.params.cardId);
        new OK({
            message: 'Activities fetched successfully',
            data: activities
        }).send(res);
    }

    public async createActivity(req: Request, res: Response): Promise<void> {
         await activitiesService.createActivity(req.body);
        new CREATED({
            message: 'Activity created successfully',
        }).send(res);
    }
}