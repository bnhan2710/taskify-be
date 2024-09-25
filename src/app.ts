
import express , {Express , Request , Response} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import { NOT_FOUND } from 'http-status';
const PORT : string | undefined = '8000'
const app:Express = express();

//Connection to database
// import './configs/database.config';

//Middlewware
app.use(express.json())
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.urlencoded({extended:true}));

app.get('/',(req:Request,res: Response) =>{
    res.send('Hello World!')
})

//v1 Routes


//Error Handler


app.use('*', (req : Request, res : Response) => res.status(NOT_FOUND).json({
    status: NOT_FOUND,
    message: `Can not GET ${req.originalUrl}`,
}));

app.listen(PORT, () => {  
    console.log(`Server is running on http://localhost:${PORT}`);
})