import { ActivityLog } from "../../orm/entities/Activity_Log";
import connection from "../../configs/database.connect";
import { NotFoundError } from "../../handler/error.response";
class ActivitiesService {
    public async logActivity(activityDTO: ActivityLog): Promise<void> {
        await connection.getRepository(ActivityLog).save(activityDTO);
    }
}
export default new ActivitiesService();