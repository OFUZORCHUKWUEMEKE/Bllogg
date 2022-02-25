import express ,{Router} from 'express'
import { Login, Register } from '../../controllers/auth'


const router = Router()

router.post('/login',Login)
router.post('/register',Register)


export {router as AuthRoute}