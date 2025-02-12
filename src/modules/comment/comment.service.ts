import commentRepository from "./comment.repository";
import { IComment, ICommentUpdate } from "./dto";
import { Comment } from "../../orm/entities/Comment";
import cardRepository from "../card/card.repository";
import userRepository from "../user/user.repository";
import { NotFoundError, ForbiddenError } from "../../handler/error.response";

class CommentService {
    public async newComment(commentDto: IComment): Promise<any> {
        const card = await cardRepository.findById(commentDto.cardId);
        if (!card) {
            throw new NotFoundError('Card not found');
        }
        const user = await userRepository.findOneById(commentDto.userId);
        if (!user) {
            throw new NotFoundError('User not found');
        }
       const created =  await commentRepository.insert(commentDto, card , user);
        return {
            id: created.id,
            content: created.content,
            createdAt: created.createdAt,
            user: {
                id: user.id,
                displayName: user.displayName,
                avatar: user.avatar
            }
        }
    }

    public async listAllComments(): Promise<Comment[]> {
        return await commentRepository.ListAllComments();
    }

    public async getCommentById(commentId: string): Promise<Comment> {
        const comment = await commentRepository.findById(commentId);
        if (!comment) {
            throw new NotFoundError('Comment not found');
        }
        return comment;
    }

    public async updateComment(updateCommentDto: ICommentUpdate, commentId: string ,userId: string): Promise<void> {
        const comment = await commentRepository.findById(commentId);
        if (!comment) {
            throw new NotFoundError('Comment not found');
        }
        if(comment.user.id !== userId){
            throw new ForbiddenError('This comment does not belong to you');
        }
         await commentRepository.update(updateCommentDto, commentId);
    }

    public async removeComment(commentId: string, userId:string): Promise<void> {
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