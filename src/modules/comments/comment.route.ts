import { Router } from "express";
import CommentController from "./comment.controller";
import  validate from "../../middleware/validate";
import { commentSchema, commentUpdateSchema } from "./validator/comment.validate";
import asyncHandler from "../../middleware/asyncHandle";
import { isLoggedIn } from "../../middleware/auth.middleware";
const router = Router();

router.post("/",isLoggedIn, validate(commentSchema), asyncHandler(CommentController.newComment));
router.get("/",isLoggedIn, asyncHandler(CommentController.listAllComments));
router.get("/:id",isLoggedIn, asyncHandler(CommentController.getCommentDetail));
router.put("/:id",isLoggedIn, validate(commentUpdateSchema), asyncHandler(CommentController.updateComment));
router.delete("/:id",isLoggedIn, asyncHandler(CommentController.removeComment));

export default router;