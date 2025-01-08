import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import session from 'express-session';
import passport from 'passport';
import { NOT_FOUND } from 'http-status';
import cookieParser from 'cookie-parser';
import 'reflect-metadata';
import {ConnectDB} from './configs/database.connect'; 
import { corsOptions } from './configs/cors.config';
import { env } from './configs/env.config';
import { errorHandler } from './handler/errorHandle';
import v1Api from './routes/v1.route';
import { ConnectRedis } from './configs/redis.config';

const app: Express = express();
const PORT: string | number = env.PORT || '8000';


const configureMiddlewares = () => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(session({
        secret: env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    }));
    app.use(cookieParser())
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(cors(corsOptions));
    app.use(helmet());
    app.use(morgan('dev'));
};

const configureDatabase = async () => {
    await ConnectDB();
    await ConnectRedis();
}

const configureRoutes = () => {
    app.use('/api/v1', v1Api); 
    app.use('*', (req: Request, res: Response) => res.status(NOT_FOUND).json({
        status: NOT_FOUND,
        message: `Can not GET ${req.originalUrl}`,
    }));
    app.use(errorHandler);
};

const boostrap = async () => {
    try {
        await configureDatabase();
        configureMiddlewares();
        configureRoutes();
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start the server:', error);
        process.exit(1);
    }
};

boostrap();
export default app;
