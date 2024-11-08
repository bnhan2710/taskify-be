import connection from "../../configs/database.connect";
import { User } from '../../orm/entities/User';
import { Repository } from "typeorm";
class UserRepository {
    private readonly repository: Repository<User>;
    constructor() {
        this.repository = connection.getRepository(User);
    }

    public async findOneById(id: number): Promise<User | null> {
        return await this.repository.findOne({ where: { id } });
    }

    public async findAll(): Promise<User[]> {
        return await this.repository.find({
            select: {
                username: true,
                fullName: true,
                email: true,
                age: true
            }
        });
    }

    public async updateById(id: number, updateData: Partial<User>): Promise<void> {
        await this.repository.update({ id }, updateData);
    }

    public async deleteById(id: number): Promise<void> {
        await this.repository.delete({ id });
    }
}

export default new UserRepository();