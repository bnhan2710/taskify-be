import { Router } from 'express'
import UserRoute from '../modules/users/users.route'
import AuthRoute from '../modules/auth/auth.route'
import RoleRoute from '../modules/roles/role.route'
import WorkspaceRoute from '../modules/workspaces/workspace.router'
import BoardRoute from '../modules/boards/board.route'
import ListRoute from '../modules/lists/list.route'
import CardRoute from '../modules/cards/card.route'
import ChecklistRoute from '../modules/checklists/checklist.route'
import AttachmentRoute from '../modules/attachment/attachment.route'
import NotificationRouter from '../modules/notification/sse.router'
import CommentRouter from '../modules/comments/comment.route'
const router :Router = Router()

router.use('/users',UserRoute)
router.use('/auth',AuthRoute)
router.use('/roles' ,RoleRoute)
router.use('/workspaces',WorkspaceRoute)
router.use('/boards',BoardRoute)
router.use('/lists',ListRoute)
router.use('/cards',CardRoute)
router.use('/checklists',ChecklistRoute)
router.use('/attachments',AttachmentRoute)
router.use('/notifications',NotificationRouter)
router.use('/comments',CommentRouter)

export default router
