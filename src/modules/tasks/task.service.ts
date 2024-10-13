import connection from "../../configs/database.connect"
import { Task } from "../../orm/entities/Task"
import { BadRequestError, NotFoundError } from "../../errors/error.response"
import { ITask } from "./dto/index.dto"
class TaskService{ 

    public async getAllTask():Promise<Task[]>{
        const tasks = await connection.getRepository(Task).find({select:{
            title:true,
            description:true,
            isDone:true
        }})
        return tasks
    }

    public async DoneTask(taskId:number):Promise<void>{
        const task = await connection.getRepository(Task).findOne({where:{id:taskId}})
        if(!task){
            throw new Error('Task not found')
        }
        await connection.getRepository(Task).update({id:taskId},{isDone:true})
    }

    public async DeleteTask(taskId:number):Promise<void>{
        const task = await connection.getRepository(Task).findOne({where:{id:taskId}})
        if(!task){
            throw new Error('Task not found')
        }
        await connection.getRepository(Task).delete({id:taskId})
    }

    public async CreateTask(createTaskDto: ITask):Promise<void>{
        const task = await connection.getRepository(Task).findOne({where:{title:createTaskDto.title}})
        if(task){
            throw new BadRequestError('Task already exist')
        }
        await connection.getRepository(Task).insert(createTaskDto)
    }

    public async UpdateTask(taskId:number,updateTaskDto : ITask ):Promise<void>{
        const task = await connection.getRepository(Task).findOne({where:{id:taskId}})
        if(!task){
            throw new NotFoundError('Task not found')
        }
        await connection.getRepository(Task).update({id:taskId},{title:updateTaskDto.title,description:updateTaskDto.description})
    }

}

export default new TaskService