import { Request, Response , NextFunction } from "express"
import { createTaskDTO, updateTaskDTO } from "./dto/index.dto"
import taskService from "./task.service"
class TaskController{
    public async getAllTask(req: Request, res: Response, next: NextFunction){
            const tasks = await taskService.getAllTask()
            res.status(200).json(tasks)
    }

    public async DoneTask(req: Request, res: Response, next: NextFunction){
        const taskId = parseInt(req.params.id)
        await taskService.DoneTask(taskId)
        res.status(200).json({message:'Set task to done successfully'})
    }

    public async DeleteTask(req: Request, res: Response, next: NextFunction){
        const taskId = parseInt(req.params.id)
        await taskService.DeleteTask(taskId)
        res.status(200).json({message:'Task is deleted'})
    }

    public async CreateTask(req: Request, res: Response, next: NextFunction){
        const taskDTO =createTaskDTO(req.body)
        await taskService.CreateTask(taskDTO)
        res.status(201).json({message:'Task is created'})
    }

    public async UpdateTask(req: Request, res: Response, next: NextFunction){
        const taskId = parseInt(req.params.id)
        const updatetaskDto =updateTaskDTO(req.body)
        await taskService.UpdateTask(taskId, updatetaskDto)
        res.status(200).json({message:'Task is updated'})
    }
}
export default new TaskController