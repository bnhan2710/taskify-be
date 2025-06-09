import { Router } from 'express';
import UserRoute from '../../modules/user/users.route';
import AuthRoute from '../../modules/auth/auth.route';
import RoleRoute from '../../modules/role/role.route';
import WorkspaceRoute from '../../modules/workspace/workspace.router';
import BoardRoute from '../../modules/board/board.route';
import ListRoute from '../../modules/list/list.route';
import CardRoute from '../../modules/card/card.route';
import ChecklistRoute from '../../modules/checklist/checklist.route';
import UploadRoute from '../../modules/upload/upload.route';
import NotificationRouter from '../../modules/notification/notification.router';
import CommentRouter from '../../modules/comment/comment.route';
import ActivitiesRoute from '../../modules/activity/activities.route';
const router: Router = Router();

router.use('/users', UserRoute);
router.use('/auth', AuthRoute);
router.use('/roles', RoleRoute);
router.use('/workspaces', WorkspaceRoute);
router.use('/boards', BoardRoute);
router.use('/lists', ListRoute);
router.use('/cards', CardRoute);
router.use('/checklists', ChecklistRoute);
router.use('/upload', UploadRoute);
router.use('/notifications', NotificationRouter);
router.use('/comments', CommentRouter);
router.use('/activities', ActivitiesRoute);

export default router;
