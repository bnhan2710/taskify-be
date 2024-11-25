import dotenv from 'dotenv';
dotenv.config();
export const env = {
    BUILD_MODE: process.env.BUILD_MODE,
    PORT : process.env.PORT || 8000, 
    DB_HOST : process.env.DB_HOST || 'localhost',
    DB_USER : process.env.DB_USER || 'root',
    DB_PASS : process.env.DB_PASS || '',
    DB_NAME : process.env.DB_NAME || 'mydb',
    DB_PORT: process.env.DB_PORT || '3306',
    DB_DIALECT : process.env.DB_DIALECT || 'mysql',
    SECRET_KEY : process.env.SECRET_KEY || 'secret',
    REDIS_URL : process.env.REDIS_URL || '',
    CACHE_EXPIRE : process.env.CACHE_EXPIRE || '',
    REFRESH_TOEN_EXPIRE: process.env.REFRESH_TOEN_EXPIRE || 86400000,
    ACCESS_TOKEN_EXPIRE : process.env.ACCESS_TOKEN_EXPIRE || 900000,
    CLOUDINARY_CLOUD_NAME : process.env.CLOUDINARY_CLOUD_NAME || '',
    CLOUDINARY_API_KEY : process.env.CLOUDINARY_API_KEY || '',
    CLOUDINARY_API_SECRET : process.env.CLOUDINARY_API_SECRET || '',
    GOOGLE_CLIENT_ID : process.env.GOOGLE_CLIENT_ID || '',
    GOOGLE_CLIENT_SECRET : process.env.GOOGLE_CLIENT_SECRET || '',
    SESSION_SECRET : process.env.SESSION_SECRET || '',
}