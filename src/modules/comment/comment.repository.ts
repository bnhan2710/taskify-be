import connection from '../../core/configs/database.connect';
import { Repository } from 'typeorm';
import { Comment } from '../../database/entities/Comment';
import { IComment, ICommentRepository, IUpdateComment } from './interface';
class CommentRepository implements ICommentRepository {
  private readonly repository: Repository<Comment>;
  constructor() {
    this.repository = connection.getRepository(Comment);
  }

  public async insert(commentDto: IComment, userId: string): Promise<Comment> {
    const newComment = this.repository.create({
      content: commentDto.content,
      card: {
        id: commentDto.cardId,
      },
      user: {
        id: userId,
      },
    });
    return await this.repository.save(newComment);
  }

  public async findById(id: string): Promise<Comment | null> {
    return await this.repository.findOne({ where: { id }, relations: ['user'] });
  }

  public async update(updateCommentDto: IUpdateComment, commentId: string): Promise<void> {
    await this.repository.update({ id: commentId }, { content: updateCommentDto.content });
  }

  public async remove(comment: Comment): Promise<Comment> {
    return await this.repository.remove(comment);
  }
}

export default new CommentRepository();
