import { Gender } from "../../../shared/common/enums/gender";
import { User } from "../../../database/entities/User";

export interface IUser {
    id: string;
    username: string;
    email: string;
    avatar: string;
    displayName: string;
}

export interface IUserCreateDto {
    username: string;
    password?: string;
    email?: string;
    displayName?: string;
    age?: number;
}

export interface IUpdateUserDto {
    displayName?:string,
    age?:number,
    gender?:Gender,
    avatar?:string,
}

export type UpdateInfo = {
    displayName?: string,
    age?: number,
    gender?: string
}

export interface IUserRepository{
    create(user: IUserCreateDto): Promise<void>;
    findOneById(id: string): Promise<User | null>;
    findOnebyEmail(email: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    updateById(id: string, updateData: Partial<User>): Promise<void>
    deleteById(id: string): Promise<void>;
}

export interface IUserService {
    getMe(id: string) : Promise<User | null>;
    getAll(): Promise<User[]>;
    getOneUserById(id: string): Promise<User | null>;
    getUserByEmail(email: string): Promise<User | null>;
    create(createUserDto: IUserCreateDto): Promise<void>;
    updateUserById(id: string, updateUserDto: IUpdateUserDto): Promise<UpdateInfo>;
    deleteUserById(id: string): Promise<void>;
}

