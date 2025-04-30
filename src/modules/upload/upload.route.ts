import { Router } from 'express';
import { upload } from '../../shared/utils/multer.uitl';
import uploadController from './upload.controller';
import asyncHandler from '../../core/middleware/async-handler';
import validate from '../../core/middleware/validate';
import { attachmentLinkValidation } from './validator/attachments.validate';
import { authenticate } from '../../core/middleware/authentication-middleware';
const router = Router();

// Route for uploading attachments
router.post('/', upload.single('file'), asyncHandler(uploadController.uploadAttachment));
// Route for uploading avatar
router.post(
  '/avatar',
  authenticate,
  upload.single('avatar'),
  asyncHandler(uploadController.uploadAvatar),
);
// Route for attachment link
router.post(
  '/link',
  validate(attachmentLinkValidation),
  asyncHandler(uploadController.linkAttachment),
);
router.post(
  '/card-cover/:cardId',
  authenticate,
  upload.single('cardCover'),
  asyncHandler(uploadController.uploadCardCover),
);
//remove card cover
router.delete('/card-cover/:cardId', authenticate, asyncHandler(uploadController.removeCardCover));
// Route for getting attachments by card ID
router.delete('/delete/:id', asyncHandler(uploadController.removeAttachment));

export default router;
