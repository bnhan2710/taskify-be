import { Router } from 'express';
import CommentController from './comment.controller';
import validate from '../../core/middleware/validate';
import { commentSchema, commentUpdateSchema } from './validator/comment.validate';
import asyncHandler from '../../core/middleware/async-handler';
import { authenticate } from '../../core/middleware/authentication-middleware';
const router = Router();

router.post('/', authenticate, validate(commentSchema), asyncHandler(CommentController.newComment));
router.get('/:id', authenticate, asyncHandler(CommentController.getCommentDetail));
router.put(
  '/:id',
  authenticate,
  validate(commentUpdateSchema),
  asyncHandler(CommentController.updateComment),
);
router.delete('/:id', authenticate, asyncHandler(CommentController.removeComment));

export default router;
