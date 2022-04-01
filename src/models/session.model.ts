import {Schema, model} from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';
import mongoose from 'mongoose';
import {UserDocument} from "./user.model";

export interface SchemaDocument extends mongoose.Document{
    user: UserDocument["_id"],
    valid: boolean;
    userAgent: String;
    createdAt: Date;
    upDatedAt: Date
}
const sessionSchema = new Schema({
    user:{type: Schema.Types.ObjectId, ref: "User"},
    valid:{type: Boolean, default: true},
    userAgent: {type: String}
},
{
    timestamps: true,
});


const SessionModel = model("Session", sessionSchema);

export default SessionModel;