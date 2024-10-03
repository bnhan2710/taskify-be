import { Router } from 'express'
import UserRoute from '../modules/users/users.route'
import AuthRoute from '../modules/auth/auth.route'
const router :Router = Router()

router.use('/users',UserRoute)
router.use('/auth',AuthRoute)

export default router
