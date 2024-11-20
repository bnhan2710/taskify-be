export interface IComment{
    text: string
    cardId: number
}

export function commentDTO(comment: IComment){
    return {
        text: comment.text,
        cardId: comment.cardId
    }
}