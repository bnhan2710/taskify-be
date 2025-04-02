import { Router } from "express";
import CommentController from "./comment.controller";
import  validate from "../../core/middleware/validate";
import { commentSchema, commentUpdateSchema } from "./validator/comment.validate";
import asyncHandler from "../../core/middleware/asyncHandle";
import { checkAuth } from "../../core/middleware/checkAuth";
const router = Router();

router.post("/",
    checkAuth, 
    validate(commentSchema),
    asyncHandler(CommentController.newComment));
router.get("/:id",
    checkAuth,
    asyncHandler(CommentController.getCommentDetail));
router.put("/:id",checkAuth,
    validate(commentUpdateSchema),
    asyncHandler(CommentController.updateComment));
router.delete("/:id",
    checkAuth, 
    asyncHandler(CommentController.removeComment));

export default router;