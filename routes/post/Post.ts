import express ,{Router} from 'express';
import { createPost, GetAllPosts, getUserPost,DeleteUserPost, LikePost } from '../../controllers/post';
import { validate } from '../../middlewares/validate';

const router = Router()

router.get('/' ,GetAllPosts)   
router.post('/' ,validate,createPost)   
router.get('/userpost' ,validate,getUserPost)   
router.delete('/:id' ,validate,DeleteUserPost)   
router.patch('/:id' ,validate,LikePost)   


export {router as PostRoute}