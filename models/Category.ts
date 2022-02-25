import mongoose,{Document,Schema,model} from "mongoose";

interface categoryDoc extends Document{
    name:string
    post:[string]
}

const categorySchema = new Schema({
    name:{type:String},
    post:[{type:Schema.Types.ObjectId,ref:'post'}]
},{timestamps:true})

const category = model('category',categorySchema)

export default category