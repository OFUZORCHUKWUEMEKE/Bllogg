import mongoose,{Document,Schema,model} from "mongoose";

interface UserDoc extends Document{
    username:string,
    password:string,
    email:string
    about:string
    hobbies:string
    linkedIn:string
    github:string
    twitter:string
    facebook:string
    posts:[]
    department:string
    faculty:string
    level:string
    access:string
    followers:[string]
}


const UserSchema = new Schema({
    username:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    email:{type:String,unique:true,required:true},
    about:{type:String},
    hobbies:{type:String},
    linkedIn:{type:String},
    github:{type:String},
    twitter:{type:String},    
    facebook:{type:String},
    department:{type:String},
    level:{type:String},
    faculty:{type:String},
    isAdmin:{type:Boolean ,default:false},
    string:{type:String},
    access:{type:String},
    posts:[{type:Schema.Types.ObjectId,ref:'Post'}],
    // posts:[],
    followers:[{type:Schema.Types.ObjectId,ref:'Post'}]
},{timestamps:true})

const User = model('User',UserSchema)

export {User}