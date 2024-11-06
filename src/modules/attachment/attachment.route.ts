import { Router } from "express";
import { upload } from "../../utils/multer.uitl";
import AttachmentController from "./attachment.controller";
import asyncHandler from "../../middleware/asyncHandle";
const router = Router();

router.post('/upload', upload.single('file'), asyncHandler(AttachmentController.uploadAttachment));

export default router;