import { Router } from 'express'
import UserRoute from '../modules/users/users.route'
import AuthRoute from '../modules/auth/auth.route'
import RoleRoute from '../modules/roles/role.route'
import WorkspaceRoute from '../modules/workspaces/workspace.router'

const router :Router = Router()

router.use('/users',UserRoute)
router.use('/auth',AuthRoute)
router.use('/roles' ,RoleRoute)
router.use('/workspaces',WorkspaceRoute)


export default router
