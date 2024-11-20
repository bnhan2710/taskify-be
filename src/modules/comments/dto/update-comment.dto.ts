export interface ICommentUpdate {
    text: string;
}

export function commentUpdateDTO(body: any): ICommentUpdate {
    return {
        text: body.text,
    };
}