import mongoose from 'mongoose'
import {MONGO_URI} from '../config'

export const connectDb = async()=>mongoose.connect(MONGO_URI,()=>console.log('connected to db'))