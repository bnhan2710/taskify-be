import { BadRequestError, NotFoundError } from "../../core/handler/error.response";
import { IUserCreateDto, IUpdateUserDto, IUserService } from './interface';
import { User } from "../../database/entities/User";
import userRepository from './user.repository';
class UserService implements IUserService {

    public async getMe(id: string): Promise<User | null> {
        return await userRepository.findOneById(id);
    }
    
    public async getAll(): Promise<User[]> {
        const users = await userRepository.findAll();
        if (!users.length) {
            throw new NotFoundError('No users found');
        }
        return users;
    }
    
    public async getOneUserById(id: string): Promise<User | null> {
        const user = await userRepository.findOneById(id);
        if (!user) {
            throw new NotFoundError(`User with ID ${id} not found`);
        }
        return user;
    }
    
    public async getUserByEmail(email: string): Promise<User | null> {
        const user = await userRepository.findOnebyEmail(email);
        return user;
    }
    
    public async create(createUserDto: IUserCreateDto): Promise<void> {
        await userRepository.create(createUserDto);
    }
    
    public async updateOneUserById(id: string, updateUserDto: IUpdateUserDto): Promise<void> {
        const user = await userRepository.findOneById(id);
        if (!user) {
            throw new BadRequestError('User not found');
        }
        await userRepository.updateById(id, { displayName: updateUserDto.displayName });
    }

    public async deleteUserById(id: string): Promise<void> {
        const user = await userRepository.findOneById(id);
        if (!user) {
            throw new NotFoundError('User not found');
        }
        await userRepository.deleteById(id);
    }
}

export default new UserService();
