import ActivitiesRepository from "./activities.repository";
import { NotFoundError } from "../../handler/error.response";
import { ActivityLog } from "../../orm/entities/Activity_Log";
class ActivitiesService {
    public async getActivities(): Promise<ActivityLog[]> {
        return await ActivitiesRepository.getActivities();
    }

    public async getActivityById(id: string): Promise<ActivityLog> {
        const activity = await ActivitiesRepository.getActivityById(id);
        if (!activity) {
            throw new NotFoundError('Activity not found');
        }
        return activity;
    }

    public async getActivityByBoardId(boardId: string): Promise<ActivityLog[]> {
        return await ActivitiesRepository.getActivityByBoardId(boardId);
    }

    public async getActivityByCard(cardId: string): Promise<ActivityLog[]> {
        return await ActivitiesRepository.getActivityByCard(cardId);
    }

    public async createActivity(activity: ActivityLog): Promise<void> {
         await ActivitiesRepository.createActivity(activity);
    }
}

export default new ActivitiesService();