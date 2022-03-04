import express , {Response,Request,NextFunction} from 'express'
import { PostDocc, Userr } from '../dto'
import Post from '../models/Post'
import { User } from '../models/User'
import mongoose from 'mongoose'


export const GetAllPosts = async(req:Request,res:Response,next:NextFunction)=>{

    try{
        const payload = req.user
        const post = await Post.find({})
        const user = await Post.find({postId:payload?._id})
        return res.status(200).json({post})
    }catch(err:any){
       res.status(400).json({message:err.message})
    }

}

export const createPost = async (req:Request,res:Response,next:NextFunction) => {
    const {title,description,blogpost,category} = req.body
    const payload = req.user
    
    const user = await User.findById(payload?._id) as Userr

    const post = await Post.create({
        postId:payload?._id, 
        title,
        description,
        blogpost,category
    })

    post.user.push(user)
    
    await User.updateOne({_id:payload?._id},{$push:{posts:post}})

    await user.save()  

    await post.save()

    res.status(200).json(user)
}

export const getUserPost = async (req:Request,res:Response,next:NextFunction)=>{

    const payload = req.user

    const user = await User.findById(payload?._id)

    const post = await Post.find({postId:payload?._id})

    return res.status(200).json({post:post,user})

}


export const DeleteUserPost = async(req:Request,res:Response,next:NextFunction) =>{
    const {id} = req.params

    const payload = req.user

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await Post.findByIdAndRemove(id);
    
    res.json({ message: "Post deleted successfully." });
    
}

export const LikePost = async(req:Request,res:Response,next:NextFunction)=>{

        const { id } = req.params;
    
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
        
        const post = await Post.findById(id);
    
        const updatedPost = await Post.findByIdAndUpdate(id, { likes: post.likes + 1 }, { new: true });
        
        res.json(updatedPost);
   
}










