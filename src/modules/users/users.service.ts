import pool from "../../configs/database.connect";
import { BadRequestError , NotFoundError } from "../../response/errors/error.response";

class UsersService {
    public async getAllUsers(): Promise<any> {
        const [users]: any = await pool.query('SELECT * FROM users');
        if (!users.length || users.length === 0) {
            throw new NotFoundError('Not found any user');
        }
        return users;
    }

    public async getUserById(id: number): Promise<any> {
        const [user]: any = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        if (!user.length) {
            throw new NotFoundError('User not found');
        }
        return user[0];
    }

    public async createUser(body: any): Promise<void> {
        const {fullName , age, username, email, role} = body;
        const existsUser: any = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        if (existsUser[0].length || existsUser[0].email === email) {
            throw new BadRequestError('Username or email already exists');
        }
        await pool.query('INSERT INTO users SET ?', {fullName , age, username, email, role});
    }

    public async updateUser(id: number, body: any): Promise<void> {
        const {fullName , age, role} = body;
        const [user]: any = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        if (!user.length) {
            throw new NotFoundError('User not found');
        }
        const [update]: any = await pool.query('UPDATE users SET ? WHERE id = ?', [{fullName , age, role}, id]);
        if (!update.affectedRows) {
            throw new BadRequestError('User not modified');
        }
    }

    public async deleteUser(id: number): Promise<void> {
        const [user]: any = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        if (!user.length) {
            throw new NotFoundError('User not found');
        }
         await pool.query('DELETE FROM users WHERE id = ?', [id]);
    }
}

export default new UsersService