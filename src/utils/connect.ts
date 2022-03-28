import mongoose from 'mongoose';
import config from 'config';

const connect = async () =>{
    const dbUri = config.get<string>("dbUri");
    try{
    const conn=await  mongoose.connect(dbUri)
    console.log(`MongoDB connected: ${conn.connection.host}`);
    }
    catch(err){
        console.log(err);

    }
}
export default connect;