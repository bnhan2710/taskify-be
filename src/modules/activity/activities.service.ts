import { ActivityLog } from '../../database/entities/Activity_Log';
import connection from '../../core/configs/database.connect';
import { NotFoundError } from '../../core/handler/error.response';
import { ActivityType } from '../../shared/common/enums/activity';

class ActivitiesService {
  public async logActivity(activityData: {
    type: ActivityType;
    userId: string;
    boardId?: string;
    listId?: string;
    cardId?: string;
    metadata?: Record<string, any>;
  }): Promise<ActivityLog> {
    const activityLog = connection.getRepository(ActivityLog).create({
      type: activityData.type,
      user: { id: activityData.userId },
      board: activityData.boardId ? { id: activityData.boardId } : undefined,
      list: activityData.listId ? { id: activityData.listId } : undefined,
      card: activityData.cardId ? { id: activityData.cardId } : undefined,
      metadata: activityData.metadata,
    });

    return await connection.getRepository(ActivityLog).save(activityLog);
  }

  public async getBoardActivityLogs(boardId: string, limit: number = 50): Promise<ActivityLog[]> {
    const activityLogs = await connection
      .getRepository(ActivityLog)
      .createQueryBuilder('activity')
      .leftJoinAndSelect('activity.user', 'user')
      .leftJoinAndSelect('activity.board', 'board')
      .leftJoinAndSelect('activity.list', 'list')
      .leftJoinAndSelect('activity.card', 'card')
      .where('activity.board.id = :boardId', { boardId })
      .orderBy('activity.createdAt', 'DESC')
      .limit(limit)
      .getMany();

    return activityLogs;
  }

  public async getAllActivityLogs(limit: number = 100): Promise<ActivityLog[]> {
    const activityLogs = await connection
      .getRepository(ActivityLog)
      .createQueryBuilder('activity')
      .leftJoinAndSelect('activity.user', 'user')
      .leftJoinAndSelect('activity.board', 'board')
      .leftJoinAndSelect('activity.list', 'list')
      .leftJoinAndSelect('activity.card', 'card')
      .orderBy('activity.createdAt', 'DESC')
      .limit(limit)
      .getMany();

    return activityLogs;
  }
}

export default new ActivitiesService();
