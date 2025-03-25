import { ActivityLog } from "../../database/entities/Activity_Log";
import connection from "../../core/configs/database.connect";
import { NotFoundError } from "../../core/handler/error.response";
class ActivitiesService {
    public async logActivity(activityDTO: ActivityLog): Promise<void> {
        await connection.getRepository(ActivityLog).save(activityDTO);
    }
}
export default new ActivitiesService();