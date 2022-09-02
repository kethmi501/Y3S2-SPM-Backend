import express, { Router } from 'express'
import { CreateTree, retrieveAll, retriveUserPosts , deletePost } from '../controllers/tree'
import { checkUser } from '../middlewares/auth'

const router = express.Router()

router.post('/tree', checkUser, CreateTree)
router.get('/gettrees', retrieveAll)
router.get('/getuserposts', checkUser, retriveUserPosts)
router.delete('/deleteTree' , checkUser , deletePost )

module.exports = router
