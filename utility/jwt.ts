import jwt from 'jsonwebtoken'
import { secret } from '../config'
import { AuthPayload } from '../dto'


export const GenerateSignature = async(user:AuthPayload) =>{
   return  jwt.sign({_id: user._id,username:user.username,email:user.email,isAdmin:user.isAdmin }, secret, { expiresIn: '5d' })
}

export const DecodeToken = async(token:string)=>{
  return  jwt.verify(token.split(" ")[1],secret) as AuthPayload
}