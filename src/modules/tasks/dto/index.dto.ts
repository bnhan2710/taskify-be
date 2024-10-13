export interface ITask {
    title: string;
    description: string;
}

export function createTaskDTO(body: any): ITask {
    return {
        title: body.title,
        description: body.description
    }
}

export function updateTaskDTO(body: any): ITask {
    return {
        title: body.title,
        description: body.description
    }
}