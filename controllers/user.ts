import express, {Request,Response,NextFunction} from 'express'
import mongoose from 'mongoose'
import { Userr } from '../dto';
// import {Router} from 'express';
import { User } from '../models/User';



export const GetSingleUser = async (req:Request,res:Response,next:NextFunction)=>{

    const {user} = req.params

    const userProfile = await User.find({username:user})

    res.status(200).json(userProfile)
    
}

export const UpdateUserProfile = async(req:Request,res:Response,next:NextFunction)=>{

    const payload = req.user 

    const {user} = req.params

    const userr = await User.find({username:user})
    
    await User.findByIdAndUpdate(payload?._id,req.body,{new:true})

    return res.status(201).json(userr)

}      
     
export const follow = async (req:Request,res:Response,next:NextFunction)=>{
    
    const payload = req.user
     
    const {user} = req.params
    
    const followUser = await User.findById(payload?._id)
    
    

    await User.updateOne({username:user},{$push:{followers:followUser}}) 
    
 
     
    // res.status(201).json(updated)
    
}




export const ResetPassword = async (req:Request,res:Response,next:NextFunction)=>{
   const {email} = req.body
   
   const user = await User.find({email:email})
   
   if(user){
      
   }
}