import { Comment } from "../../../database/entities/Comment";

export interface IComment{
    content: string
    cardId: string
}

export interface IUpdateComment { 
    content: string
}

export interface ICommentService { 
    newComment(commentDto: IComment, userId: string): Promise<any>;
    getCommentById(commentId: string): Promise<Comment>;
    updateComment(updateCommentDto: IUpdateComment, commentId: string ,userId: string): Promise<void>;
    removeComment(commentId: string, userId:string): Promise<void>;
}

export interface ICommentRepository { 
    insert(commentDto: IComment, userId : string): Promise<Comment>;
    findById(id: string): Promise<Comment | null>;
    update(updateCommentDto: IUpdateComment, commentId:string ): Promise<void>;
    remove(comment: Comment): Promise<Comment>;
}