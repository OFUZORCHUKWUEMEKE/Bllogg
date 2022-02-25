import {Document} from 'mongoose'

export interface UserBody {
    username:string
    password:string
    email:string
}

export interface Userr extends Document{
    _id:string
    username:string,
    password:string,
    email:string
    about:string
    hobbies:string
    linkedIn:string
    github:string
    twitter:string
    facebook:string
    posts:[string]
    department:string
    faculty:string
    level:string
    access:string
}

export interface AuthPayload {
    _id:string,   
    username:string,
    email:string
}