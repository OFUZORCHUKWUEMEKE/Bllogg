
import mongoose,{Document,Schema,model} from "mongoose";

interface PostDoc extends Document{
    title:string
    image:string
    description:string
    likes:[string]
    comments:[string]
    category:[string]
}

const PostSchema = new Schema({
    title:{type:String,required:true},
    image:{type:String},
    description:{type:String},
    likes:[{type:Schema.Types.ObjectId,ref:'User'}],
    comments:[{type:Schema.Types.ObjectId,ref:'User'}],
    category:[String],
},{timestamps:true})

const Post = model<PostDoc>('post',PostSchema)

export default Post



