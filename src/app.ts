import express,{Request, Response} from 'express';
import config from 'config';
import connect from './utils/connect';
import logger from "./utils/logger"; 
import routes from './routes';
const port = config.get<number>('port')
const app = express();
app.get("/",(req:Request, res:Response)=>{
    res.json({message: "Please Like the Video!"});

})

app.listen(port, async () =>{
    logger.info(`App is running in mode: ${process.env.NODE_ENV}`);
    await connect();
    routes(app);
}) 