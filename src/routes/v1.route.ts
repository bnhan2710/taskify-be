import { Router } from 'express'
import UserRoute from '../modules/users/users.route'
import AuthRoute from '../modules/auth/auth.route'
import RoleRoute from '../modules/roles/role.route'
import WorkspaceRoute from '../modules/workspaces/workspace.router'
import BoardRoute from '../modules/boards/board.route'
import ListRoute from '../modules/lists/list.route'
import CardRoute from '../modules/cards/card.route'
const router :Router = Router()

router.use('/users',UserRoute)
router.use('/auth',AuthRoute)
router.use('/roles' ,RoleRoute)
router.use('/workspaces',WorkspaceRoute)
router.use('/boards',BoardRoute)
router.use('/lists',ListRoute)
router.use('/cards',CardRoute)

export default router
