
import express , {Express , Request , Response} from 'express';
import 'reflect-metadata'
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import { NOT_FOUND } from 'http-status';
import { config } from 'dotenv';
config();
import { errorHandler } from './handler/errorHandle';
import v1Api from './routes/v1.route'
const PORT : string | undefined = process.env.PORT || '8000';

const app:Express = express();

//Connection to database
import './configs/database.connect';
//Connection to redis
import './configs/redis.config';
//Middlewware
app.use(express.json())
app.use(cors());
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

