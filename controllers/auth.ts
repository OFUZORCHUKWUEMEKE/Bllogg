import {Response,Request,NextFunction} from 'express'
import { UserBody, Userr } from '../dto'
import HttpException from '../error/error'
import {User} from '../models/User'
import { GenerateSignature } from '../utility/jwt'
import {Document} from 'mongoose'
import { ComparePassword, generateSalt, HashedPassword } from '../utility/password'


export const Login = async (req:Request,res:Response,next:NextFunction) => {
     
     const {email,password} = req.body

     const user = await User.findOne({email}) as Userr

     !user && res.status(400).json({message:'user not found'})  

     const access = await ComparePassword(password,user.password)
     console.log(access)
     
     !access && res.status(400).json({message:'invalid password'})
     
     if(access){
         const token = await GenerateSignature({_id:user._id,username:user.username,email:user.email}) 
         
         user.access = token
         await user.save()
        
         res.json(user)                   
     }
  
}
export const Register = async (req:Request,res:Response,next:NextFunction)=>{
  const {email,password,username} = req.body


  const emaill = await User.findOne({email})

  const user = await User.findOne({username})

  if(emaill  || user){
    next(new HttpException(400, 'Credentials Already In use'));
  }

  const salt = await generateSalt()  

  const hashed = await HashedPassword(password,salt)

  const newUser = await User.create({email,password:hashed,username,twitter:'',instagram:'',github:'',linkedIn:'',hobbies:'',about:'',posts:[],level:'',faculty:'',department:'',access:''})

   return res.status(200).json(newUser)
} 

