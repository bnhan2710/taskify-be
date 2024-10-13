
import { DataSource, Entity } from "typeorm";
import {User} from "../orm/entities/User"
import {Role} from "../orm/entities/Role"
import {Permission} from "../orm/entities/Permission"
import { Task } from "../orm/entities/Task";
const databaseType = process.env.DB_DIALECT as "mysql" | "mariadb" | "postgres" | "sqlite" | "oracle" | "mssql";

const connection = new DataSource({
    type: databaseType,
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'test',
    synchronize: true,
    logging : false,
    entities: [User,Role,Permission,Task],
    migrations: ["src/orm/migrations/*.ts"],
});

const ConnectDB = async (): Promise<void> => {
  try {
    await connection.initialize();
    console.log(`Database connected: ${connection.options.database}`);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

ConnectDB();

export default connection;