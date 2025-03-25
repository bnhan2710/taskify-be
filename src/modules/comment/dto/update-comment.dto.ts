import { IUpdateComment } from "../interface";

export function commentUpdateDTO(body: any): IUpdateComment {
    return {
        content: body.content,
    };
}