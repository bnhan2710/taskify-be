import connection from '../../core/configs/database.connect';
import { User } from '../../database/entities/User';
import { Repository } from 'typeorm';
import { IUserCreateDto, IUserRepository } from './interface';
class UserRepository implements IUserRepository {
  private readonly repository: Repository<User>;
  constructor() {
    this.repository = connection.getRepository(User);
  }

  public async create(user: IUserCreateDto): Promise<void> {
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
        displayName: true,
        email: true,
        age: true,
        avatar: true,
      },
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
