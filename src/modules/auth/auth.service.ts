import { LoginDto, RegisterDto} from "./dto";
import connection from "../../configs/database.connect"
import { User } from "../../orm/entities/User";
import { Token } from "../../orm/entities/Token";
import { TokenEnum } from "../../common/enums/token";
import { generateAccessToken , hashPassword , comparePassword, generateRefreshToken } from './auth.util'
import { ConflictRequestError, NotFoundError , AuthFailError, BadRequestError } from '../../handler/error.response'

class AuthService {
    private readonly userRepository = connection.getRepository(User)
    private readonly tokenRepository = connection.getRepository(Token)

    public async login(loginDto: LoginDto):Promise<{accessToken: string} | undefined>{
        const user = await this.userRepository.findOne({where:{username: loginDto.username }})
            if(!user){
                throw new NotFoundError('Username not found!')
            }
            const matchPassword = await comparePassword(loginDto.password,user.password)
            if(!matchPassword){
                throw new AuthFailError('Password is incorrect!')
            }
            const payloadData = {
                id: user.id,
                username: user.username
            }
            const refreshToken = await generateRefreshToken(payloadData)
            const accessToken = await generateAccessToken(payloadData)
            await this.tokenRepository.find({where:{user: user}})
            if(user){
                await this.tokenRepository.delete({user: user})
            }
            await this.tokenRepository.save({
                token: refreshToken,
                type: TokenEnum.REFRESH,
                expires: new Date(Date.now() + (process.env.REFRESH_TOKEN_EXPIRES ? parseInt(process.env.REFRESH_TOKEN_EXPIRES) : 31536000000)),
                user: user
            })
            return {
                accessToken
            }
    }

    public async googleLogin(user: User):Promise<{accessToken: string} | undefined>{
        if(!user){
            throw new BadRequestError('User does not valid');
        }
        const payloadData = {
            id: user.id,
            username: user.username
        }
        console.log(user)
        const refreshToken = await generateRefreshToken(payloadData)
        const accessToken = await generateAccessToken(payloadData)
        await this.tokenRepository.find({where:{user: user}})
        if(user){
            await this.tokenRepository.delete({user: user})
        }
        await this.tokenRepository.save({
            token: refreshToken,
            type: TokenEnum.REFRESH,
            expires: new Date(Date.now() + (process.env.REFRESH_TOKEN_EXPIRES ? parseInt(process.env.REFRESH_TOKEN_EXPIRES) : 31536000000)),
            user: user
        })
        return {
            accessToken
        }
    }
    public async register(registerDto: RegisterDto):Promise<void>{
            const ExitsUser = await this.userRepository.findOne({ where: { username: registerDto.username } });
            if(ExitsUser){
                throw new ConflictRequestError('User already exits')
            } 
            const ExitsEmail = await this.userRepository.findOne({ where: { email: registerDto.email } });
            if(ExitsEmail){
                throw new ConflictRequestError('Email already exits')
            }
            registerDto.password = await hashPassword(registerDto.password)
            await this.userRepository.save({
                username: registerDto.username,
                email: registerDto.email,
                password: registerDto.password,
            })
            
       }
    public async logout(userId: number):Promise<void>{
        const user = await this.userRepository.findOne({where:{id: userId}})
        if(!user){
            throw new NotFoundError('User not found!')
        }
        await this.tokenRepository.delete({user: user})
    }

}


export default new AuthService