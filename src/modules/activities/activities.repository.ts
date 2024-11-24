import { ActivityLog } from "src/orm/entities/Activity_Log";
import { Repository } from "typeorm";
import connection from "src/configs/database.connect";
class ActivitiesRepository {
    private readonly repository: Repository<ActivityLog>;
    constructor() {
        this.repository = connection.getRepository(ActivityLog);
    }

  public async getActivities(): Promise<ActivityLog[]> {
    return this.repository.find();
  }

  public async getActivityById(id: string): Promise<ActivityLog | null> {
        return this.repository.findOne({ where: { id } });
  }

  public async getActivityByBoardId(boardId: string): Promise<ActivityLog[]> {
    return this.repository.find({ where: { board: {id:boardId} } });
    }

    public async getActivityByCard(cardId: string): Promise<ActivityLog[]> {
        return this.repository.find({ where: { card: { id:cardId} } });
    }

   public async createActivity(activity: ActivityLog): Promise<void> {
         this.repository.save(activity);
}

}

export default new ActivitiesRepository;