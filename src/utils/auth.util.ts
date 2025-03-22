import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto'
import { env } from '../configs/env.config';

export const generateAccessToken = (data: string | object): string => {
    try {
        if (!process.env.SECRET_KEY) {
            throw new Error('SECRET_KEY is not defined');
        }
        return jwt.sign( data , env.SECRET_KEY, { expiresIn: env.ACCESS_TOKEN_EXPIRE});
    } catch (error) {
;
        throw new Error('Token generation failed');
    }
};

export const generateRefreshToken = (data: string | object): string => {
    try {
        if (!process.env.SECRET_KEY) {
            throw new Error('SECRET_KEY is not defined');
        }
        return jwt.sign( data , process.env.SECRET_KEY, { expiresIn: env.REFRESH_TOKEN_EXPIRE});
    } catch (error) {
;
        throw new Error('Token generation failed');
    }
};

export const verifyToken = (token:string): any | null => {
        try {
            const user =  jwt.verify(token, env.SECRET_KEY, async (err, decoded) => {
                if (err) {
                    return null
                }
                return decoded
            });
            return user
        } catch (error) {
            throw new Error('Verify failed')
        }
}

export const comparePassword = (password: string, hash: string): boolean => {
    try {
        return bcrypt.compareSync(password, hash);
    } catch (error) {
        throw new Error('Password comparison failed');
    }
};


export const hashPassword = (password: string): string => {
    try {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    } catch (error) {
        throw new Error('Password hashing failed');
    }
};

export const generateToken = (): string =>{
    return crypto.randomBytes(10).toString('hex');
}
