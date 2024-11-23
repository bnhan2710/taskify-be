export interface IComment{
    text: string
    cardId: string
}

export function commentDTO(comment: IComment){
    return {
        text: comment.text,
        cardId: comment.cardId
    }
}