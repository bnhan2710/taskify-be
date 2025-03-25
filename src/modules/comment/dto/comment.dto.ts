import { IComment } from "../interface";

export function commentDTO(comment: IComment){
    return {
        content: comment.content,
        cardId: comment.cardId,
    }
}