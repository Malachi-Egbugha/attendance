import mongoose from 'mongoose';
import config from 'config';
import logger from "./logger";

const connect = async () =>{
    const dbUri = config.get<string>("dbUri");
    try{
    const conn=await  mongoose.connect(dbUri)
    logger.info(`MongoDB connected: ${conn.connection.host}`);
    }
    catch(err){
        logger.error(err);

    }
}
export default connect;