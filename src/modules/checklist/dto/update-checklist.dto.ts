import { IUpdateChecklist } from "../interface";

export function UpdateChecklistDTO(body:any): IUpdateChecklist {
    return {
        description: body.description,
        isDone: body.isDone
    }    
}

