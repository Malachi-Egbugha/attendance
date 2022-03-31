import {Schema, model, Document} from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';
export interface UserDocument{
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    upDatedAt: Date,
    comparePassword(candidatePassword: string): Promise<Boolean>
}
const userSchema = new Schema({
    email:{type: String, required: true, unique: true},
    name:{type: String, required: true},
    password:{type: String, required: true}
},
{
    timestamps: true,
});
userSchema.pre("save", async function(next){
    let user = this as UserDocument;
    try{
        //GENERATE A SALT
        const salt = await bcrypt.genSalt(config.get<number>('saltWorkerFactor'));
        //generate password hash
        const hash = await bcrypt.hashSync(user.password, salt);
        //re-assign hashed version of original
        user.password = hash;
        next();

    }
    catch(error:any){
        next(error)
    }
   

});
userSchema.methods.comparePassword = async function(candidatePassword: string):Promise<boolean>{
    const user = this as UserDocument;
    try{
    return bcrypt.compare(candidatePassword, user.password);
    }
    catch(error){
        return false;
    }
}
const UserModel = model("User", userSchema);

export default UserModel