import express ,{Router} from 'express'
import { adminRegister,adminLogin, deleteUser, GetUsers } from '../../controllers/admin' 
import { isAdmin, validate } from '../../middlewares/validate'


const router = Router()

router.get('/users',validate,GetUsers)
router.post('/register',adminRegister)     
router.post('/login',adminLogin)     
router.delete('/:id',validate,deleteUser)     

export {router as AdminRoute}