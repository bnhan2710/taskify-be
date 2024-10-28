import connection from "../../configs/database.connect";
import { User } from '../../orm/entities/User';
import { Repository } from "typeorm";
class UserRepository {
    private readonly userRepository: Repository<User>;
    constructor() {
        this.userRepository = connection.getRepository(User);
    }

    public async findOneById(id: number): Promise<User | null> {
        return await this.userRepository.findOne({ where: { id } });
    }

    public async findAll(): Promise<User[]> {
        return await this.userRepository.find({
            select: {
                username: true,
                fullName: true,
                email: true,
                age: true
            }
        });
    }

    public async updateById(id: number, updateData: Partial<User>): Promise<void> {
        await this.userRepository.update({ id }, updateData);
    }

    public async deleteById(id: number): Promise<void> {
        await this.userRepository.delete({ id });
    }
}

export default new UserRepository();