import commentRepository from "./comment.repository";
import { IComment, ICommentUpdate } from "./dto";
import { Comment } from "../../orm/entities/Comment";
import cardRepository from "../cards/card.repository";
import userRepository from "../users/user.repository";
import { NotFoundError, BadRequestError, ForbiddenError } from "../../handler/error.response";

class CommentService {
    public async newComment(commentDto: IComment, userId:number): Promise<void> {
        const card = await cardRepository.findById(commentDto.cardId);
        if (!card) {
            throw new NotFoundError('Card not found');
        }
        const user = await userRepository.findOneById(userId);
        if (!user) {
            throw new NotFoundError('User not found');
        }
        await commentRepository.insert(commentDto, card , user);
    }

    public async listAllComments(): Promise<Comment[]> {
        return await commentRepository.ListAllComments();
    }

    public async getCommentById(commentId: number): Promise<Comment> {
        const comment = await commentRepository.findById(commentId);
        if (!comment) {
            throw new NotFoundError('Comment not found');
        }
        return comment;
    }

    public async updateComment(updateCommentDto: ICommentUpdate, commentId: number ,userId: number): Promise<void> {
        const comment = await commentRepository.findById(commentId);
        if (!comment) {
            throw new NotFoundError('Comment not found');
        }
        if(comment.user.id !== userId){
            throw new ForbiddenError('This comment does not belong to you');
        }
        await commentRepository.update(updateCommentDto, commentId);
    }

    public async removeComment(commentId: number, userId:number): Promise<void> {
        const comment = await commentRepository.findById(commentId);
        if (!comment) {
            throw new NotFoundError('Comment not found');
        }
        if(comment.user.id !== userId){
            throw new ForbiddenError('This comment does not belong to you');
        }
        await commentRepository.remove(comment);
    }
}

export default new CommentService();