export interface IUpdateChecklist {
    description?: string;
    isDone?: boolean;
}

export function UpdateChecklistDTO(body:any): IUpdateChecklist {
    return {
        description: body.description,
        isDone: body.isDone
    }    
}

