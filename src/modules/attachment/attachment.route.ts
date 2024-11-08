import { Router } from "express";
import { upload } from "../../utils/multer.uitl";
import AttachmentController from "./attachment.controller";
import asyncHandler from "../../middleware/asyncHandle";
const router = Router();

router.post('/upload', upload.single('file'), asyncHandler(AttachmentController.uploadAttachment));
router.post('/delete', asyncHandler(AttachmentController.removeAttachment));
export default router;