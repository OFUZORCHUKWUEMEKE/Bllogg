import express ,{Response,Request, NextFunction} from 'express'
import { AuthPayload } from '../dto'
import {DecodeToken} from '../utility/jwt'
import { validateSignature } from '../utility/password';


declare global {
    namespace Express{
        interface Request{
            user?:AuthPayload
        }
    }
}

export const validate = async (req: Request, res: Response, next: NextFunction) => {
    const signature = await validateSignature(req);
    if(signature){  
        console.log(signature) 
        return next() 
    }else{
        return res.json({message: "User Not authorized"});
    }
}

export const isAdmin = async (req:Request,res:Response,next:NextFunction)=>{
  const payload = req.user
  console.log(payload)
  if(payload?.isAdmin ){
      next()
  }
  res.status(403).json('You are not an admin')
}