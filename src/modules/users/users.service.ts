import connection from "../../configs/database.connect";
import { User } from '../../orm/entities/User';
import { BadRequestError, NotFoundError } from "../../handler/error.response";
import { UpdateUserDto } from './dto/update-user.dto';
class UserService{
    private userRepository = connection.getRepository(User)
    public async getMe(id:number):Promise<User | null>{
        return await this.userRepository.findOne({where:{id}})
    }

    public async getAll():Promise<User[]>{
        const users = this.userRepository.find({select:{
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

    public async getOneUserById(id:number,):Promise<User | null>{
        const user = await this.userRepository.findOne(
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
        const user = await this.userRepository.findOne({ where: { id } })
        if(!user){
            throw new BadRequestError('Not found user')
        }
        await this.userRepository.update({id},{fullName:updateUserDto.fullName})
    }

    public async deleteUserById(id:number):Promise<void>{
        const user = await this.userRepository.findOne({where: {id}})
        if(!user){
            throw new NotFoundError('User not found')
        }
        await this.userRepository.delete({id})
    }
}

export default new UserService