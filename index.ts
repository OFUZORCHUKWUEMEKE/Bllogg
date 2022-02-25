import express ,{NextFunction, Request,Response} from 'express'
import config from 'config'
import mongoose from 'mongoose'
import {PORTS} from './config'
import {connectDb} from './db'
import { AuthRoute } from './routes/auth/auth'
import errorMiddleware from './middlewares/error'

const app = express()

const startServer = async ()=>{
  await  connectDb()
}
startServer()
app.listen(PORTS,()=>console.log(`server running on ${PORTS}`))

app.use(express.json())
app.use(errorMiddleware)
app.use('/auth',AuthRoute)