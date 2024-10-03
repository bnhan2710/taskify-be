import connection from "../../configs/database.connect";
import { User } from '../../orm/entities/User';
import { BadRequestError, NotFoundError } from "../../errors/error.response";
import { UpdateUserDto } from './dto/update-user.dto';
class UserService{
    public async getAll():Promise<any>{
        const users = await connection.getRepository(User).find({select:{
            username:true,
            fullName:true,
            email:true,
            age:true
        }}) 
        if(!users){
            throw new NotFoundError('Not found any user')
        }
        return users    
    }

    public async getOneUserById(id:number,):Promise<any>{
        const user = await connection.getRepository(User).findOne(
            {where:{id}, 
            select: {
                username:true,
                fullName:true,
                email:true,
                age:true
            }
        })
        if(!user){
            throw new NotFoundError(`Not found user with id = ${id}`)
        }
        return user
    }

    public async updateOneUserById(id:number, updateUserDto:UpdateUserDto):Promise<void>{
        const user = await connection.getRepository(User).findOne({ where: { id } })
        if(!user){
            throw new BadRequestError('Not found user')
        }
        await connection.getRepository(User).update({id},{fullName:updateUserDto.fullName})
    }

    public async deleteUserById(id:number):Promise<void>{
        const user = await connection.getRepository(User).findOne({where: {id}})
        if(!user){
            throw new NotFoundError('User not found')
        }
        await connection.getRepository(User).softDelete({id})
    }
}

export default new UserService