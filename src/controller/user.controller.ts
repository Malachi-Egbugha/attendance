import {Request, Response} from 'express';
import {omit} from 'lodash';
//import { CreateUserInput } from '../schema/user.schema';
import { createUser } from '../service/user.service';
import logger from "../utils/logger";
export async  function createUserHandler//(req:Request<{},{},CreateUserInput["body"]>,res: Response){
(req:Request,res: Response){
    try{
        const user = await createUser(req.body);
        return res.json(omit(user.toJSON(),["password"]));
  
    }
    catch(e:any){
        logger.error(e);
        return res.status(409).send(e.message);

    }

} 

