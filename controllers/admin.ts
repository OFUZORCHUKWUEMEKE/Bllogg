import {Response,Request,NextFunction} from 'express'

import { ComparePassword, generateSalt, HashedPassword } from '../utility/password'

import HttpException from '../error/error'

import { GenerateSignature } from '../utility/jwt'

import { UserBody, Userr } from '../dto'

import {User} from '../models/User'
import mongoose from 'mongoose'

export const adminLogin = async (req:Request,res:Response,next:NextFunction)=>{
    const {email,password} = req.body

    const user = await User.findOne({email}) as Userr

    !user.isAdmin && res.status(400).json({message:'You are not an Admin'})
    
    const access = await ComparePassword(password,user.password)
    console.log(access)
    
    !access && res.status(400).json({message:'invalid password'})
    

    if(access){
        const token = await GenerateSignature({_id:user._id,username:user.username,email:user.email,isAdmin:user.isAdmin}) 
        
        user.access = token
        await user.save()
       
        res.json(user)                   
    }

}
export const adminRegister = async (req:Request,res:Response,next:NextFunction)=>{
    const {username,email,password} = req.body

    const emaill = await User.findOne({email})

    const user = await User.findOne({username})

    if(emaill  || user){
    next(new HttpException(400, 'Credentials Already In use'));
    }

    const salt = await generateSalt()  

    const hashed = await HashedPassword(password,salt) 

    const newUser = await User.create({email,password:hashed,username,twitter:'',instagram:'',github:'',linkedIn:'',hobbies:'',about:'',posts:[],level:'',isAdmin:true,faculty:'',department:'',access:'',followers:[]})
    console.log(newUser)
    return res.status(200).json(newUser)
}

export const deleteUser = async (req:Request,res:Response,next:NextFunction)=>{
    const {id} = req.params

    const payload = req.user

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json('invalid user id')
    if(payload?.isAdmin){
        await User.findByIdAndDelete(id)

        res.status(200).json('user has been successfully deleted') 
    }else{
        res.status(400).json('you not at admin') 
    }
    
}


export const GetUsers = async(req:Request,res:Response,next:NextFunction)=>{

    const payload = req.user 
    const users = await User.find({})
    console.log(payload)
    if(payload?.isAdmin){    
        return  res.status(200).json(users)
    }else{
        res.status(400).json('You are not an Admin')
    }
   
}