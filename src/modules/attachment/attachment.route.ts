import { Router } from "express";
import { upload } from "../../shared/utils/multer.uitl";
import AttachmentController from "./attachment.controller";
import asyncHandler from "../../core/middleware/asyncHandle";
import validate from "../../core/middleware/validate";
import { attachmentLinkValidation } from "./validator/attachments.validate"; 
const router = Router();

router.post('/upload', upload.single('file'), asyncHandler(AttachmentController.uploadAttachment));
router.post('/link', validate(attachmentLinkValidation), asyncHandler(AttachmentController.linkAttachment));
router.get('/get/:cardId', asyncHandler(AttachmentController.getAttachmentBycard));
router.delete('/delete/:id', asyncHandler(AttachmentController.removeAttachment));

export default router;