import { Router } from "express";
import CommentController from "./comment.controller";
import  validate from "../../middleware/validate";
import { commentSchema, commentUpdateSchema } from "./validator/comment.validate";
import asyncHandler from "../../middleware/asyncHandle";
import { checkAuth } from "../../middleware/checkAuth";
const router = Router();

router.post("/",checkAuth, validate(commentSchema), asyncHandler(CommentController.newComment));
router.get("/",checkAuth, asyncHandler(CommentController.listAllComments));
router.get("/:id",checkAuth, asyncHandler(CommentController.getCommentDetail));
router.put("/:id",checkAuth, validate(commentUpdateSchema), asyncHandler(CommentController.updateComment));
router.delete("/:id",checkAuth, asyncHandler(CommentController.removeComment));

export default router;