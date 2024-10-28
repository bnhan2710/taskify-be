// src/services/user.service.ts
import { User } from '../../orm/entities/User';
import { BadRequestError, NotFoundError } from "../../handler/error.response";
import { UpdateUserDto } from './dto/update-user.dto';
import userRepository from './user.repository';

class UserService {
    public async getMe(id: number): Promise<User | null> {
        return await userRepository.findOneById(id);
    }

    public async getAll(): Promise<User[]> {
        const users = await userRepository.findAll();
        if (!users.length) {
            throw new NotFoundError('No users found');
        }
        return users;
    }

    public async getOneUserById(id: number): Promise<User | null> {
        const user = await userRepository.findOneById(id);
        if (!user) {
            throw new NotFoundError(`User with ID ${id} not found`);
        }
        return user;
    }

    public async updateOneUserById(id: number, updateUserDto: UpdateUserDto): Promise<void> {
        const user = await userRepository.findOneById(id);
        if (!user) {
            throw new BadRequestError('User not found');
        }
        await userRepository.updateById(id, { fullName: updateUserDto.fullName });
    }

    public async deleteUserById(id: number): Promise<void> {
        const user = await userRepository.findOneById(id);
        if (!user) {
            throw new NotFoundError('User not found');
        }
        await userRepository.deleteById(id);
    }
}

export default new UserService();
