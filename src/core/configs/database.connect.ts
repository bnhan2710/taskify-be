import { DataSource } from 'typeorm';
import { env } from './env.config';
const databaseType = process.env.DB_DIALECT as
  | 'mysql'
  | 'mariadb'
  | 'postgres'
  | 'sqlite'
  | 'oracle'
  | 'mssql';
const connection = new DataSource({
  type: databaseType,
  host: env.DB_HOST,
  port: parseInt(env.DB_PORT?.toString()),
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [__dirname + '/../../database/entities/*.ts'],
  migrations: [__dirname + '/../../database/migrations/*.ts'],
});

export const connectDB = async (): Promise<void> => {
  try {
    await connection.initialize();
    console.log(`Database connected: ${connection.options.database}`);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

export default connection;
