import express ,{Router} from 'express';
import { follow, GetSingleUser, UpdateUserProfile } from '../../controllers/user'; 

import { validate } from '../../middlewares/validate';

const router = Router()


router.get('/:user',GetSingleUser)

router.patch('/:user',validate,UpdateUserProfile)

router.patch('/:user/follow',validate,follow)


export {router as userRoute}