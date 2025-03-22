import { cleanEnv } from 'envalid';
import { bool, port, str } from 'envalid/dist/validators';


export const env = cleanEnv(process.env, {
    BUILD_MODE: str({ default: 'development' }),
    PORT: port({ default: 8000 }),
    DB_HOST: str(),
    DB_USER: str(),
    DB_PASS: str(),
    DB_NAME: str(),
    DB_PORT: port(),
    DB_DIALECT: str({ default: 'mysql' }),
    SECRET_KEY: str(),
    REDIS_URL: str(),
    CACHE_EXPIRE: str({ default: '360000' }),
    REFRESH_TOKEN_EXPIRE: str({ default: '86400000' }),
    ACCESS_TOKEN_EXPIRE: str({ default: '60000' }),
    CLOUDINARY_CLOUD_NAME: str({ default: '' }),
    CLOUDINARY_API_KEY: str({ default: '' }),
    CLOUDINARY_API_SECRET: str({ default: '' }),
    GOOGLE_CLIENT_ID: str({ default: '' }),
    GOOGLE_CLIENT_SECRET: str({ default: '' }),
    SESSION_SECRET: str(),
});


export default env;