import { Router } from 'express';
import ActivitiesController from './activities.controller';
import asyncHandler from '../../core/middleware/async-handler';
import { authenticate } from '../../core/middleware/authentication-middleware';

const router: Router = Router();

router.get('/', authenticate, asyncHandler(ActivitiesController.getAllActivityLogs));

router.get(
  '/board/:boardId',
  authenticate,
  asyncHandler(ActivitiesController.getBoardActivityLogs),
);

router.post('/', authenticate, asyncHandler(ActivitiesController.createActivityLog));

export default router;
