export interface ICommentUpdate {
    content: string;
}

export function commentUpdateDTO(body: any): ICommentUpdate {
    return {
        content: body.content,
    };
}