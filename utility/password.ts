import bcrypt from 'bcryptjs'
import { AuthPayload } from '../dto'
import jwt from 'jsonwebtoken' 
import { secret } from '../config'
import {Request} from 'express'

export const generateSalt = async ()=>{
    return await bcrypt.genSalt()
}

export const HashedPassword = async(password:string,salt:string)=>{
    return await bcrypt.hash(password,salt)
  
}
export const ComparePassword = async(password:string,hashedPassword:string)=>{
    return await bcrypt.compare(password,hashedPassword)  
}

export const validateSignature = async(req:Request)=>{
    const signature = req.get('Authorization') 

    if(signature){
          const payload = await jwt.verify(signature.split(" ")[1],secret) as AuthPayload
           req.user = payload; 
           return true

    }
    return false 

}