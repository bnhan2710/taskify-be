import express, {Express , Request , Response} from 'express';
import 'reflect-metadata'
import morgan from 'morgan';
import cors from 'cors';
import { corsOptions } from './configs/cors.config';
import helmet from 'helmet';
import { NOT_FOUND } from 'http-status';
import { env } from './configs/env.config';
import { errorHandler } from './handler/errorHandle';
import v1Api from './routes/v1.route'
const PORT : string | number = env.PORT || '8000';
import session from 'express-session';
import passport from 'passport';
const app:Express = express();

//Connection to database`
import './configs/database.connect';
//Connection to redis
import './configs/redis.config';
//Middlewware

app.use(express.json())
app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }));
  
app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));

//v1 Routes
app.use('/api/v1',v1Api);

//Error Handler
app.use(errorHandler);

app.use('*', (req : Request, res : Response) => res.status(NOT_FOUND).json({
    status: NOT_FOUND,
    message: `Can not GET ${req.originalUrl}`,
}));

app.listen(PORT, () => {  
    console.log(`Server is running on http://localhost:${PORT}`);
})

export default app;

