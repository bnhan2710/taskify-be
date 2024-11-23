import CommentService from "./comment.service";
import { Request, Response, NextFunction } from "express";
import {OK, CREATED } from "../../handler/success.reponse"
import { commentDTO, commentUpdateDTO } from "./dto";
class CommentController{
    public async newComment(req: Request, res: Response, next: NextFunction): Promise<void> {
        const commentDto = commentDTO(req.body);
        const userId = req.userJwt.id;
        await CommentService.newComment(commentDto,userId);
        new CREATED({
            message: 'Comment created successfully'
        }).send(res);
    }

    public async listAllComments(req: Request, res: Response, next: NextFunction): Promise<void> {
        new OK({
            message: 'List all comments',
            data: await CommentService.listAllComments()
        }).send(res);
    }

    public async getCommentDetail(req: Request, res: Response, next: NextFunction): Promise<void> {
        const commentId = req.params.id
        new OK({
            message: 'Get comment detail successfully',
            data: await CommentService.getCommentById(commentId)
        }).send(res);
    }

    public async updateComment(req: Request, res: Response, next: NextFunction): Promise<void> {
        const commentId =req.params.id
        const userId = req.userJwt.id;
        const updateCommentDto = commentUpdateDTO(req.body);
        await CommentService.updateComment(updateCommentDto, commentId,userId);
        new OK({
            message: 'Comment updated successfully'
        }).send(res);
    }

    public async removeComment(req: Request, res: Response, next: NextFunction): Promise<void> {
        const commentId = req.params.id;
        const userId = req.userJwt.id;
        await CommentService.removeComment(commentId,userId);
        new OK({
            message: 'Comment removed successfully'
        }).send(res);
    }
}

export default new CommentController();