import express from 'express'
import { checkUser } from '../middlewares/auth'
import { createLocation, retrieveAll, likePost , retrieveUserPosts } from '../controllers/location'

const router = express.Router()

router.post('/location/addlocation', checkUser, createLocation)
router.get('/location/retrieveall', checkUser, retrieveAll)
router.get('/location/retrieveuserposts', checkUser, retrieveUserPosts)
router.put('/locaton/likePost', checkUser, likePost)

module.exports = router
