import connection from "../../configs/database.connect";
import { Repository } from "typeorm";
import { Comment } from "../../orm/entities/Comment";
import { IComment,ICommentUpdate } from "./dto"
import { Card } from "src/orm/entities/Card";
import { User } from "src/orm/entities/User";
class CommentRepository {
    private readonly repository: Repository<Comment>;
    constructor() {
        this.repository = connection.getRepository(Comment);
    }

    public async findById(id: string): Promise<Comment | null> {
        return await this.repository.findOne({where: {id}, relations: ['user']});
    }

    public async ListAllComments(): Promise<Comment[]> {
        return await this.repository.find();
    }

    public async insert(commentDto: IComment, card: Card, user:User): Promise<void> {
        const newComment = this.repository.create({
            text: commentDto.text,
            card,
            user
        });
        await this.repository.save(newComment);
    }

    public async update(updateCommentDto: ICommentUpdate, commentId:string ): Promise<void> {
        await this.repository.update({id: commentId}, {text: updateCommentDto.text});
    }

    public async remove(comment: Comment): Promise<Comment> {
        return await this.repository.remove(comment);
    }

}

export default new CommentRepository();