import mysql, { Pool } from 'mysql2/promise';

const pool: Pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'your-password',
    database: process.env.DB_NAME || 'your-database',
});

const testConnection = async (): Promise<void> => {
    try {
        const connection = await pool.getConnection();
        console.log(`Database connected to ${connection.config.database} database`);
        connection.release();
    } catch (error) {
        console.log('Error connecting to database', error);
    }
};

testConnection();

export default pool;