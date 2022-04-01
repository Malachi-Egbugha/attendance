import {Request, Response} from "express";
import config from 'config';
import { createSession } from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { signJwt } from "../utils/jwt.utils";
export async function createUserSessionHandler(req: Request, res: Response){
    // Validate the users's password
    const user = await validatePassword(req.body);
    if(!user){
        return res.status(401).send("invalid Username or password");
    }

    // create a session
    const session = await createSession(user._id, req.get("user-agent") || "");
    //create a refresh token
    const refreshToken = signJwt({
        ...user,session:session._id},{expiresIn:config.get('refreshTokenTtl')}
    );

    //create an access token
    const accessToken = signJwt({
        ...user,session:session._id},{expiresIn:config.get('accessTokenTtl')}
    );
   

    


    //return access and refresh token
    return res.send({accessToken, refreshToken});


}
