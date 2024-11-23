import connection from "../../configs/database.connect";
import { User } from '../../orm/entities/User';
import { Repository } from "typeorm";
import { IUserDTO } from "./dto";
class UserRepository {
    private readonly repository: Repository<User>;
    constructor() {
        this.repository = connection.getRepository(User);
    }

    public async create(user: IUserDTO): Promise<void> {
        const newUser = this.repository.create(user);
        await this.repository.save(newUser);
        
    }

    public async findOneById(id: string): Promise<User | null> {
        return await this.repository.findOne({ where: { id } });
    }

    public async findOnebyEmail(email: string): Promise<User | null> {
        return await this.repository.findOne({ where: { email } });
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
    
    public async updateById(id: string, updateData: Partial<User>): Promise<void> {
        await this.repository.update({ id }, updateData);
    }

    public async deleteById(id: string): Promise<void> {
        await this.repository.delete({ id });
    }
}

export default new UserRepository();