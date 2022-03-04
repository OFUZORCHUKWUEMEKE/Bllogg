
import mongoose,{Document,Schema,model} from "mongoose";

// type id = Schema.Types.ObjectId

interface PostDoc extends Document{
    postId:string
    title:string,
    blogpost:string
    image:string
    description:string
    likes:[string]
    comments:[string]
    category:[string]
}

const PostSchema = new Schema({
    postId:{type:String,required:true},
    title:{type:String,required:true},
    image:{type:String},
    description:{type:String,required:true},
    likes: {
        type: Number,
        default: 0,
    },
    comments:[{type:Schema.Types.ObjectId,ref:'User'}],
    blogpost:{type:String},
    category:[String],
    user:[{type:Schema.Types.ObjectId,ref:'User'}]
},{timestamps:true})

const Post = model('Post',PostSchema)

export default Post



