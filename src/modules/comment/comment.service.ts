import commentRepository from './comment.repository';
import { IComment, ICommentService, IUpdateComment } from './interface';
import { Comment } from '../../database/entities/Comment';
import cardRepository from '../card/card.repository';
import { NotFoundError, ForbiddenError } from '../../core/handler/error.response';

class CommentService implements ICommentService {
  public async newComment(commentDto: IComment, userId: string): Promise<any> {
    const card = await cardRepository.findById(commentDto.cardId);
    if (!card) {
      throw new NotFoundError('Card not found');
    }
    const created = await commentRepository.insert(commentDto, userId);
    return {
      id: created.id,
      content: created.content,
      createdAt: created.createdAt,
      user: {
        id: userId,
      },
    };
  }

  public async getCommentById(commentId: string): Promise<Comment> {
    const comment = await commentRepository.findById(commentId);
    if (!comment) {
      throw new NotFoundError('Comment not found');
    }
    return comment;
  }

  public async updateComment(
    updateCommentDto: IUpdateComment,
    commentId: string,
    userId: string,
  ): Promise<void> {
    const comment = await commentRepository.findById(commentId);
    if (!comment) {
      throw new NotFoundError('Comment not found');
    }
    if (comment.user.id !== userId) {
      throw new ForbiddenError('This comment does not belong to you');
    }
    await commentRepository.update(updateCommentDto, commentId);
  }

  public async removeComment(commentId: string, userId: string): Promise<void> {
    const comment = await commentRepository.findById(commentId);
    if (!comment) {
      throw new NotFoundError('Comment not found');
    }
    if (comment.user.id !== userId) {
      throw new ForbiddenError('This comment does not belong to you');
    }
    await commentRepository.remove(comment);
  }
}

export default new CommentService();
