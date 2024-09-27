import { Router } from 'express'
import UserRoute from '../modules/users/users.route'
const router :Router = Router()

router.use('/users',UserRoute)

export default router
