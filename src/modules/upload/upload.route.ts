import { Router } from "express";
import { upload } from "../../shared/utils/multer.uitl";
import UploadController from "./upload.controller";
import asyncHandler from "../../core/middleware/asyncHandle";
import validate from "../../core/middleware/validate";
import { attachmentLinkValidation } from "./validator/attachments.validate"; 
import { checkAuth } from "../../core/middleware/checkAuth";
const router = Router();

// Route for uploading attachments
router.post('/', 
    upload.single('file'), 
    asyncHandler(UploadController.uploadAttachment));
// Route for uploading avatar
router.post('/avatar',
    checkAuth,
    upload.single('file'),
    asyncHandler(UploadController.uploadAvatar));
// Route for attachment link
router.post('/link', 
    validate(attachmentLinkValidation), 
    asyncHandler(UploadController.linkAttachment));
// Route for getting attachments by card ID
router.delete('/delete/:id', 
    asyncHandler(UploadController.removeAttachment));

export default router;