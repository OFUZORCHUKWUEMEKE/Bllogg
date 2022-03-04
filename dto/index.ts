import mongoose , {Document} from 'mongoose'

export interface UserBody {
    username:string
    password:string
    email:string
}

export interface Userr extends Document{
    _id:string
    isAdmin:boolean
    username:string,
    password:string,
    email:string
    about:string
    hobbies:string
    linkedIn:string
    github:string
    twitter:string
    facebook:string
    posts:[]
    department:string
    faculty:string
    level:string
    access:string
}

export interface PostDocc extends Document{
    title:string
    image:string
    description:string
    likes:[string]
    comments:[string]
    category:[string]
}

export interface AuthPayload {
    _id:string,   
    username:string,
    email:string
    isAdmin:boolean
}