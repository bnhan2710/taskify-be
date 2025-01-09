import dotenv from 'dotenv';
dotenv.config();

function getENV(key: string, defaultValue?: string): string {
    const value = process.env[key];
    if (value == null || value === '') {
        if (defaultValue !== undefined) {
            return defaultValue;
        }
        throw new Error(`Environment variable "${key}" is undefined or empty.`);
    }
    return value;
}

export const env = {
    BUILD_MODE: getENV('BUILD_MODE', 'development'),
    PORT: getENV('PORT', '8000'),
    DB_HOST: getENV('DB_HOST'),
    DB_USER: getENV('DB_USER'),
    DB_PASS: getENV('DB_PASS'),
    DB_NAME: getENV('DB_NAME'),
    DB_PORT: getENV('DB_PORT'),
    DB_DIALECT: getENV('DB_DIALECT', 'mysql'),
    SECRET_KEY: getENV('SECRET_KEY'),
    REDIS_URL: getENV('REDIS_URL'),
    CACHE_EXPIRE: getENV('CACHE_EXPIRE', '3600'),
    REFRESH_TOKEN_EXPIRE: getENV('REFRESH_TOKEN_EXPIRE', '86400000'),
    ACCESS_TOKEN_EXPIRE: getENV('ACCESS_TOKEN_EXPIRE', '900000'),
    CLOUDINARY_CLOUD_NAME: getENV('CLOUDINARY_CLOUD_NAME', ''),
    CLOUDINARY_API_KEY: getENV('CLOUDINARY_API_KEY', ''),
    CLOUDINARY_API_SECRET: getENV('CLOUDINARY_API_SECRET', ''),
    GOOGLE_CLIENT_ID: getENV('GOOGLE_CLIENT_ID', ''),
    GOOGLE_CLIENT_SECRET: getENV('GOOGLE_CLIENT_SECRET', ''),
    SESSION_SECRET: getENV('SESSION_SECRET', ''),
};
