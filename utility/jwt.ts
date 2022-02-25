import jwt from 'jsonwebtoken'
import { secret } from '../config'
import { AuthPayload } from '../dto'


export const GenerateSignature = async(user:AuthPayload) =>{
   return  jwt.sign({id: user._id,username:user.username,email:user.email }, secret, { expiresIn: '5d' })
}

const DecodeToken = async()=>{
    
}