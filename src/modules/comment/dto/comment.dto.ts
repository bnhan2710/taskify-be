export interface IComment{
    userId: string
    content: string
    cardId: string
}

export function commentDTO(comment: IComment){
    return {
        content: comment.content,
        cardId: comment.cardId,
        userId: comment.userId
    }
}