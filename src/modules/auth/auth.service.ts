import { IAuthService, ICredentials,IRegister } from "./interface";
import connection from "../../core/configs/database.connect"
import { User } from "../../database/entities/User";
import { Response } from "express";
import { Token } from "../../database/entities/Token";
import { TokenEnum } from "../../shared/common/enums/token";
import { generateAccessToken , hashPassword , comparePassword, generateRefreshToken, verifyToken } from '../../shared/utils/auth.util'
import { ConflictRequestError, NotFoundError , AuthFailError, BadRequestError } from '../../core/handler/error.response'
import { env } from "../../core/configs/env.config";
class AuthService implements IAuthService{
    private readonly userRepository = connection.getRepository(User)
    private readonly tokenRepository = connection.getRepository(Token)

    public async login(loginDto: ICredentials,res: Response):Promise<any>{
        const user = await this.userRepository.findOne({where:{email: loginDto.email }})
            if(!user){
                throw new AuthFailError('Email or password is incorrect!')
            }
            const matchPassword = await comparePassword(loginDto.password,user.password)
            if(!matchPassword){
                throw new AuthFailError('Email or password is incorrect!')
            }
            const payloadData = {
                id: user.id,
                username: user.username
            }
            const refreshToken = await generateRefreshToken(payloadData)
            const accessToken = await generateAccessToken(payloadData)

            if(user){
                await this.tokenRepository.delete({user: user})
            }
            await this.tokenRepository.save({
                token: refreshToken,
                type: TokenEnum.REFRESH,
                expires: new Date(Date.now() + env.ACCESS_TOKEN_EXPIRE),
                user: user
            })

            res.cookie('refreshToken', refreshToken ,{
                httpOnly:true,
                maxAge: parseInt(env.REFRESH_TOKEN_EXPIRE)
            })

            const { password,...userInfo } = user
            return {
                accessToken,
                ...userInfo
            }
    }

    public async googleLogin(user: User):Promise<{accessToken: string} | undefined>{
        if(!user){
            throw new BadRequestError('User not found!')
        }
        const findUser = await this.userRepository.findOne({where:{email: user.email}}) 
        if(!findUser){
            throw new NotFoundError('User not found!')
        }
        const payloadData = {
            id: findUser.id,
            username: findUser.username
        }
        const refreshToken = await generateRefreshToken(payloadData)
        const accessToken = await generateAccessToken(payloadData)
        const userTokens = await this.tokenRepository.find({
            where: { user: { id: findUser.id } },
            relations: ['user'], 
        });
        if(!userTokens){
            await this.tokenRepository.delete({ user: { id: findUser.id } });
        }
        await this.tokenRepository.save({
            token: refreshToken,
            type: TokenEnum.REFRESH,
            expires: (new Date(Date.now() + env.REFRESH_TOKEN_EXPIRE)).toISOString(),
            user: findUser
        })
        return {
            accessToken
        }
    }

    public async register(registerDto: IRegister):Promise<void>{
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

    public async logout(userId: string,res: Response):Promise<void>{
        const user = await this.userRepository.findOne({where:{id: userId}})
        if(!user){
            throw new NotFoundError('User not found!')
        }
        res.clearCookie("refreshToken")
        await this.tokenRepository.delete({user: user})
    }

    public async refreshNewToken(resfreshToken: string,res: Response):Promise<{accessToken:string}>{
            console.log('REFRESH NEW TOKEN')
            const user = await verifyToken(resfreshToken)
            if(!user){
                console.log(user)
                 throw new AuthFailError('refeshToken is invalid')    
            }
            const payload = {
                id: user.id,
                username: user.username
            }
            
            const accessToken = generateAccessToken(payload)
            return { accessToken }
        }
    
}

export default new AuthService