import { Router } from 'express';
import { upload } from '../../shared/utils/multer.uitl';
import uploadController from './upload.controller';
import asyncHandler from '../../core/middleware/async-handler';
import validate from '../../core/middleware/validate';
import { attachmentLinkValidation } from './validator/attachments.validate';
import { authenticate } from '../../core/middleware/authentication-middleware';
import { requireBoardPermissions } from '../../core/middleware/auhthorization-board';
import { PermissionEnum } from '../../shared/common/enums/permission';
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
  requireBoardPermissions([PermissionEnum.CAN_UPDATE_CARD]),
  upload.single('cardCover'),
  asyncHandler(uploadController.uploadCardCover),
);

//remove card cover
router.delete('/card-cover/:cardId', authenticate, asyncHandler(uploadController.removeCardCover));

router.post(
  '/board-cover/:boardId',
  authenticate,
  requireBoardPermissions([PermissionEnum.CAN_UPDATE_BOARD]),
  upload.single('boardCover'),
  asyncHandler(uploadController.uploadBoardCover),
);

router.delete(
  '/board-cover/:boardId',
  authenticate,
  requireBoardPermissions([PermissionEnum.CAN_UPDATE_BOARD]),
  asyncHandler(uploadController.removeBoardCover),
);

router.delete('/delete/:id', asyncHandler(uploadController.removeAttachment));

export default router;
