import express from 'express'
import { checkUser } from '../middlewares/auth'
import {
  createLocation,
  retrieveAll,
  likePost,
  retrieveUserPosts,
  deletePost,
  retrieveOneUpdate,
  searchLocation,
  updateLocation,
} from '../controllers/location'

const router = express.Router()

router.post('/location/addlocation', checkUser, createLocation)
router.get('/location/retrieveall', checkUser, retrieveAll)
router.post('/location/retrieveOneUpdate', checkUser, retrieveOneUpdate)
router.get('/location/retrieveuserposts', checkUser, retrieveUserPosts)
router.put('/locaton/likePost', checkUser, likePost)
router.delete('/location/delete', checkUser, deletePost)
router.post('/location/search', searchLocation)
router.put('/location/updatelocation', checkUser, updateLocation)

module.exports = router
